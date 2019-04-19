/*
 Copyright 2019 Square Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import { CHARGE_SERVER_URL } from '../Constants';
import ChargeError from '../ChargeError';

export default async function chargeCardNonce(nonce) {
  let postData = new FormData();
  for (let x in nonce) {
      postData.append(x, nonce[x]);
  }
  const response = await fetch(CHARGE_SERVER_URL, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    body: postData,
  });

  try {
    const responseJson = await response;
    console.log(responseJson);
    // if (responseJson.errorMessage != null) {
    //   console.log(responseJson.errorMessage);
    //   throw new ChargeError(responseJson.errorMessage);
    // }
  } catch (error) {
    console.log(error.message);
    throw new ChargeError(error.message);
  }
}
