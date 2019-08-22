/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

async function RegisterBannedPerson(asset) {
	asset.bannedPerson.airlineThatBanned = asset.airlineThatBanned;

	let assetRegistry = await getAssetRegistry('org.example.mynetwork.BannedPerson');
	await assetRegistry.update(asset.bannedPerson);
	/*
	var factory = getFactory();

	num_id = (Math.floor(Math.random() * ( 999999 - 100000) + 100000)).toString(10)

	var assetID = asset.airlineThatBanned.airlineId + num_id;
	var newAsset = factory.newResource('org.example.mynetwork', 'BannedPerson', assetID)
	newAsset.airlineThatBanned = asset.airlineThatBanned;
	newAsset.bannedPerson = asset.bannedPerson;
	newAsset.ban = asset.ban;
	newAsset.description = asset.description;
	newAsset.banDuration = asset.banDuration;

	await assetRegistry.add(newAsset);
	*/
}
