// Copyright (c) Ardi Nursyamsu.
// Licensed under the MIT license.

import ort from "onnxruntime-node";
const { InferenceSession, Tensor } = ort;
import { tensor, sum, clipByValue, div, metrics } from "@tensorflow/tfjs";
import { readFileSync, existsSync } from "fs";
import path from "path";

/**
 * Converts array of int into BigInt64Array
 * @param {Array} array
 * @return {BigInt64Array} array of BigInt64
 */
const arrayToBigIntArray = (array) => {
  try {
    var bigArray = [];
    for (const i of array) {
      bigArray.push(BigInt(i));
    }
    return bigArray;
  } catch (e) {
    return null;
  }
};

/**
 * Do inference of tokenized string in input_ids into embedded of 384
 * @param {Array} param_input_ids Indices of input sequence tokens in the vocabulary.
 * @param {Array} param_attention_mask Mask to avoid performing attention on padding token indices. Mask values selected in [0, 1]
 * @param {Array} param_token_type_ids Segment token indices to indicate first and second portions of the inputs. Indices are selected in [0, 1]
 * @return {tensor} Embedded in float32 of [1, 384] dim (tensor of tfjs)
 */
const inferenceModel = async (param_input_ids, param_attention_mask, param_token_type_ids) => {
  const session = await InferenceSession.create(getModelDirectory());

  const data_length = param_input_ids.length;

  const input_ids = arrayToBigIntArray(param_input_ids);
  const token_type_ids = arrayToBigIntArray(param_attention_mask);
  const attention_mask = arrayToBigIntArray(param_token_type_ids);

  const tensor_input_ids = new Tensor("int64", input_ids, [1, data_length]);
  const tensor_token_type_ids = new Tensor("int64", token_type_ids, [1, data_length]);
  const tensor_attention_mask = new Tensor("int64", attention_mask, [1, data_length]);

  const feeds = {
    input_ids: tensor_input_ids,
    attention_mask: tensor_attention_mask,
    token_type_ids: tensor_token_type_ids,
  };

  const results = await session.run(feeds);
  // console.log(results)
  const tf_results = tensor(results.last_hidden_state.data, [1, data_length, 384]);

  return tf_results;
};

/**
 * Try to implement mean_pooling function from https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
 * @param {tensor} tf_results Output of the model
 * @param {Array} param_attention_mask Mask to avoid performing attention on padding token indices. Mask values selected in [0, 1]
 * @return {tensor} mean pooling output
 */
const mean_pooling = (tf_results, param_attention_mask) => {
  try {
    var tf_attention_mask = tensor(param_attention_mask);
    tf_attention_mask = tf_attention_mask.expandDims(-1).broadcastTo([1, param_attention_mask.length, 384]).cast("float32");

    const tf_sum = sum(tf_results.mul(tf_attention_mask), 1);
    const tf_clip = clipByValue(tf_attention_mask.sum(1), 1e-9, 1); //torch.clamp(input_mask_expanded.sum(1), min=1e-9)

    return div(tf_sum, tf_clip);
  } catch (e) {
    console.error("mean_pooling error: ", e);
    return null;
  }
};

/**
 * Generate 3 type of token to be feed into Bert Model (all-MiniLM-L6-v2)
 * @param {String} param_input_ids Indices of input sequence tokens in the vocabulary.
 * @return {JSON} input_ids, attention_mask, token_type_ids
 */
const tokenize = (text) => {
  // load json

  let rawdata = readFileSync(getTokenizerDirectory());
  let tokenizer_json = JSON.parse(rawdata);

  var words = text.toLowerCase();
  // push the first token
  var input_ids = [tokenizer_json.model.vocab["[CLS]"]];

  // split words into word
  for (const word of words.split(" ")) {
    const token_id = tokenizer_json.model.vocab[word];
    if (token_id) {
      input_ids.push(token_id);
    } else {
      // can't getting id from single word, try to get token_id from subwords
      var wordPiece = word;
      while (wordPiece != "##") {
        for (var i = wordPiece.length; i > 0; i--) {
          const subWord = wordPiece.substring(0, i);
          const sub_token_id = tokenizer_json.model.vocab[subWord];
          if (sub_token_id) {
            input_ids.push(sub_token_id);
            wordPiece = "##" + wordPiece.substring(i, wordPiece.length);
            break;
          }
        }
      }
    }
  }
  // add last token
  input_ids.push(tokenizer_json.model.vocab["[SEP]"]);
  var attention_mask = Array(input_ids.length).fill(1); // generate attention mask
  var token_type_ids = Array(input_ids.length).fill(0); // generate token_type ids

  return { input_ids, attention_mask, token_type_ids };
};

/**
 * An end to end model to generate embedding from sentence
 * @param {String} text Indices of input sequence tokens in the vocabulary.
 * @return {tensor} embedding tensor
 */
export const createEmbed = async (text) => {
  if (text == "" || text == null) {
    return;
  }

  var { input_ids, attention_mask, token_type_ids } = tokenize(text);

  var tf_model_output = await inferenceModel(input_ids, attention_mask, token_type_ids);

  // return tfjs.norm(mean_pooling(tf_model_output, attention_mask), 2, 0);
  return mean_pooling(tf_model_output, attention_mask);
};

/**
 * calculate cosine distance between two tensors
 * @param {tensor} embed1 target embedding to be calculated
 * @param {tensor} embed2 prediction embedding to be calculated
 * @return {Number} cosine distance in array
 */
export const calculateDistance = (embed1, embed2) => {
  return -Number(metrics.cosineProximity(embed1, embed2).arraySync());
};

const getTokenizerDirectory = () => {
  const curdir = process.cwd();
  const tokenizer_dir = path.join(curdir, "app/assets/helper/all-MiniLM-L6-v2/tokenizer.json");
  let out_dir = null;
  if (existsSync(tokenizer_dir)) {
    out_dir = tokenizer_dir;
  }

  return out_dir;
};

export const getModelDirectory = () => {
  const curdir = process.cwd();
  const tokenizer_dir = path.join(curdir, "app/assets/helper/all-MiniLM-L6-v2/model.onnx");
  let out_dir = null;
  if (existsSync(tokenizer_dir)) {
    out_dir = tokenizer_dir;
  }

  return out_dir;
}