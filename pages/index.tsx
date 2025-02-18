import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { NextPageWithLayout } from "./_app";
import FreePackageBottomSheet from "../components/FreePackageBottomSheet/FreePackageBottomSheet";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading/Loading";
import { Stat } from "../components/Stat";
import { useEnableGiftMutation } from "../graphql/mutations/enableGift.graphql.interface";
import { useEnableTodayFreePackageMutation } from "../graphql/mutations/enableTodayFreePackage.graphql.interface";
import { useLogoutMutation } from "../graphql/mutations/logout.graphql.interface";
import { MeDocument, MeQuery, useMeQuery } from "../graphql/queries/me.graphql.interface";

import { useUserPackagesQuery } from "../graphql/queries/userPackages.graphql.interface";
import { clearLocalStorageExcept, jsonToB64Url, removeWWW, roundTo, toIRR } from "../helpers";
import {
  BanknotesIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  PlusIcon,
  PowerIcon,
  TelegramIcon,
  UsersIcon,
} from "../icons";

  const akbarUsers = ["83def0be-b87e-4d62-944a-ca715db5e58e", "94d542cc-d278-4a62-8655-131daf07978a", "cefcde49-472e-4ac0-84c8-3b774ce6cb7b", "692c0770-b793-4980-b5da-1d23a437d3af", "dd3aadd3-9989-44e1-bcfd-f7df70464811", "cdab1ceb-fec4-4aaf-99de-fc05435ba64f", "b7ae112a-762d-4138-82b0-72a46c3716bc", "f99fcb94-e937-4e08-8d9d-2390bf8f181b", "990db721-6ad7-4413-9635-70d8fed7e16e", "235e04e8-3191-4ec8-a8c7-527e00ac535c", "449c3f3b-691e-4341-8441-9701ac1c0e80", "41e13515-9956-48f4-99dd-9072c6cbf789", "822b12a5-b69c-4af0-98cb-6ad8aa907b71", "a0c0d57a-c999-473b-92a7-c5b6c8af9e70", "d6419c2b-a340-4b99-b992-d6b3df1e0f8d", "906b1ba9-df40-46ad-9483-13bf0e9c40ad", "65b8783a-38d1-453e-bc3c-18c6b33999e7", "c619e2cd-0ade-402b-a09c-2e1523955e09", "7492f7b4-b7bb-4381-970b-8ca9685fc5f5", "56332c70-515b-4928-9a6b-129e7819e1f1", "992726c9-d5e8-41b2-8436-4632632b8edd", "fe82be3c-6b2b-4cd1-a6e9-5f8fe599fa1a", "4a30a883-0226-4745-9c4f-0de181b78cce", "cb1489d7-ca44-4f73-b0b1-826074c1a722", "8b8cd2ce-3402-4d8a-b416-23db998dc4cd", "a0fba53a-b19f-464d-84fe-ddd91bd8b2cf", "cd6308fc-5cec-4886-982a-4fe7dd85a7be", "82715fb5-82ba-484a-9751-585bf26216ce", "2e97f229-eaf8-45fa-b57c-ce76f75d32cb", "b66c2612-e29a-4b96-9634-dcebd143faa5", "6ac8a7ec-9760-4494-9318-43973d71b389", "69901b8a-5d45-46eb-b195-c2ac810eb2d7", "df3052a3-55d8-4c0f-8dfd-fa6d332a01eb", "58e9e22d-2677-4301-9adb-c3de19590405", "9ea6f55e-c72a-4174-a115-a812c63027ab", "6f2e1286-ec82-4869-b87b-9e005be3893e", "84f7db6d-8b62-4459-8c50-dcf914dbecc6", "5290274c-4b91-446e-93a2-4124516b003c", "caf7f85e-4882-4931-8ae7-4b3d3a06d6c1", "2b894675-1adc-4c58-b06d-cb031c2ee667", "79dedc05-5352-441f-ba60-c9dda8879bc9", "7c76b583-02ef-45e6-ae71-0b178bf6ccdf", "db685835-85f5-4082-b451-346784e99d44", "953ebf8c-62ae-4608-8c56-fb102851f007", "46dbda9a-cbdd-4694-891a-f8c9ca90f382", "01a58be0-b2cd-448a-9b0e-fef18d4fd179", "5bc384c0-7970-4038-a483-154018b7e640", "50b06ca6-2527-4477-a97d-28ff64dafbcb", "161fc1ff-7d5e-462d-820e-67fbba0585a3", "1a6e3979-b4d2-42f9-b740-b8b107e668ad", "a134ecf3-148d-44a8-b7e7-1c692499b67b", "389e8c1b-a2d6-4515-8422-79c09f876a2a", "cbb39baf-a808-469f-8489-ba2ea6bdd4c8", "f8690228-f55e-44a4-878a-2bf7a51356da", "be405f7d-4414-4db1-b967-bb6edf204f8e", "ee707fd7-a30d-4204-b95e-617ef30950be", "36df8adf-249d-4034-a7c4-2eab985db50f", "b0fbe589-471a-46a2-9368-e862667cd9fd", "59e1e4cc-8213-4a3b-93cc-e7817de95440", "63dcce57-da69-4df7-a940-d64ca48fe516", "5592e5f0-a8e5-4503-9605-d4ecb4849db5", "ea710fbc-81e0-4277-929a-507fef3d5656", "10c743e9-7641-42d9-8a6a-4790284f3bc8", "fa2d65ce-8fed-459a-8de6-90ff093c1b4c", "9314f7d5-bb26-429f-868b-57bc5544479f", "1b95ada1-da44-453d-8788-f045e158154c", "378e990b-1489-41d0-9377-8a8790fb2c2e", "6404c465-6c87-4453-9f27-574e358e15d0", "df580d89-ef44-44ec-afc7-8c35f91b8009", "ddc2d772-73f1-4313-8d34-46cbda716b4e", "211d5e28-aa50-462a-9c67-4da6104e438d", "056134b3-ee4e-425a-9357-7082434669dd", "40526706-b9e1-4ed6-8176-0d4c01b9bec0", "9b4d3d06-2976-4197-be62-45343ea62843", "852e7bb5-85d9-499a-8b9f-d1ae39d6aea1", "1bd9b811-8ae4-41c0-8a6b-37c50a63fbfa", "9e043ad9-6f71-441c-a8b4-03c3afa68257", "045b91f9-78ca-4ccb-91c2-8387d481b8a3", "790196bd-985e-4651-8438-6002f90e13ee", "5008c862-1a76-40aa-9e5d-94d89663230b", "fa4dc39d-0ed4-4a57-b2f6-1e1002662075", "78dd1c9e-337e-4cf8-ab53-3aea8c734587", "76b5ce3d-4fff-4141-b506-6790ec7085f0", "ef2e2048-fe40-4252-b490-db3e1dd34724", "bd039a27-daed-4706-9030-f18722d1dfe0", "a75e3859-1ade-4c29-87a7-617fc6b97548", "cd196566-1155-4246-85f7-c82e745aaf28", "b30db7fb-c7c7-439c-8483-f08beffb6ec7", "c26a61f3-ed74-4cab-90af-eff96f20ca72", "babf082d-aab4-4b5b-b270-2900b5982e8f", "4e2a1807-56e8-4c23-be28-d0f86d30c199", "1a4df261-dc3e-424a-8870-0cef545abbc2", "60ee14f7-b907-49ac-8f22-ec623af82575", "4b97aba9-d5e1-4324-953c-8d38776bb510", "a57946da-e856-4c4a-acf3-c4045a77c6f9", "abc36962-8d2a-490a-9cab-e4c896f25530", "1d5f5924-f8e8-4e49-b871-2a9e46ba24b3", "e22bf71d-8733-4143-9bae-7b939870cee6", "95945819-4962-4b58-a6a0-4bbb6c846498", "ce949df7-dcdc-4c8e-b438-12150bf109ca", "e90cedb3-5f4a-470f-a81d-779105e9b6ff", "2b6cac66-de17-4dd0-bac0-88e811f655f7", "dc220d64-7ef5-4812-89bc-c8515b235ff3", "96145b10-0dc3-4006-91d3-b9e5a56edcd1", "64a29775-a5bb-4e24-8ed1-e91343f36ab5", "07f7c691-4458-4da3-ad5c-fa96b54759df", "202b41e8-e38c-43c1-ad55-01bc30dd0150", "a20fe674-df05-41ab-b977-652aec79dfc9", "03cdbc42-2c0e-4b97-ae68-728f2def4b9a", "d36612ae-c102-40ff-8122-f62f950e8723", "165b98fa-7133-42a3-bbad-925b423a41f7", "c59a27ce-e04f-4e88-91bc-2fba20917260", "1649f200-9380-4f6b-b652-f566c0156d1c", "220a08f6-2436-4209-9356-3e2bc60689c2", "88b8ae21-9766-4286-9954-1b0e251504d0", "82f828a4-0dab-4d4e-974a-1a0bc2789d63", "9b70fd80-366c-45fa-990d-ad0b65b9e7ab", "9f92c1de-ffed-4166-b8ec-5b001edd33ee", "e90d5bc8-79a0-457a-ba93-198daf25516d", "a0838cf1-0c7e-4425-90a6-0aef1f19caf0", "6a6f821b-958f-4a31-95e8-2c499482feb6", "85d511e8-ba67-4a6d-ade7-a031020310e2", "0d7b9d10-fbb9-4e57-ad34-cd336f92d58e", "23ca1942-fe3f-4e74-8df4-dc5003a6456f", "1e4ea493-2887-4174-b09d-6ee6b5107713", "380bd9ee-32dd-4445-a4c8-e3ba3af5754f", "c2e777a0-f12f-4ebe-9dd2-89f9b21b48ac", "7449eeba-044a-42f2-acb5-dce8688ba011", "74bc9feb-e9c9-4b42-96e3-cd9af535bd4e", "bd0ed29d-a375-4511-982a-9aa298957d1c", "be900ece-e8c5-44dd-bb0f-d8f3ea0bf66a", "5c7a93bb-b54a-41ae-815c-cc954dab078c", "9fbb824e-d7a7-44c2-a7ef-eaf6f1c51fba", "4f91fc1c-2453-4058-8f83-bf9f23767231", "9fcb5e67-7573-49f2-b992-f0c7ca379628", "c8f75b5b-5c14-4f8e-ba5a-957a87e52b1d", "abd9b4d7-3f73-4118-a6dc-12e40ecc27f0", "6df0f4c2-7608-4721-a668-9e9862a19cc0", "6e23a22c-64f0-41fd-8fa5-a5bfb6b677ff", "bd0a1832-6123-4a95-b23f-36fb0e543f69", "877c6dd4-9a09-4ce7-b05b-d6bd419245c4", "e1cf8434-3fd2-4ccd-b1dd-e53d92df5bae", "cfb02ca1-2e4b-4add-92df-5b5d558ff9c0", "569315c6-ae74-4e9e-91f3-55c439de9676", "8ab8f71e-7d7f-4a56-ae40-df3274077931", "f9dadd57-27c1-48b9-8545-43c062e476f1", "bb2e181e-4532-4fe3-bf1e-d60aa358eb85", "062ef3ff-48e9-41c1-8231-5e79c1b8a7ea", "c833aa59-de3c-4167-b5ce-4b6975d9a410", "20d9c8ff-9d63-4873-a29a-139945f91291", "f481ce60-5444-4088-97fb-e98e5bc55810", "38bbbc6b-1077-49bc-a12d-9d6258db760c", "7662fab6-0583-47f3-9984-12e679e18262", "da13e775-a089-4aff-a5a8-f85d258c788d", "dc2fe5d9-4162-44ca-9355-776b275d172b", "413ca638-be3b-43bc-a4f4-949239a84a3e", "111abae6-25e9-4c97-b1a7-615368567691", "41f0d1b1-cdcc-4df7-b8df-49109f479a14", "444d630c-f126-46e6-8d16-ace115876b5f", "2f9969ef-5a50-4f6f-9c62-8ae1ce2b8dd0", "85bddd85-d49e-451b-b873-b824f4227fdf", "18ad1171-3bf5-4394-86c0-bb8a95706b19", "6bddf302-4e46-4ce7-9eab-6bc5cd79c57c", "39221627-b31a-414b-b8fe-e0b3df9f5159", "65dda600-db68-471b-9f21-19a076af91ef", "c7e4fea4-c484-41a3-9fb1-ce19f89b5207", "0e6ea606-5c43-4414-af4d-fdd0e16bdc0a", "73ccbb90-2b88-4428-8b37-9fd194aa2a9e", "4f9801ce-010d-4cec-9867-434f54e1f01d", "7f9b5b60-6415-4233-aaab-dbba04d0c284", "1ba50ee0-82d2-4692-a6a5-b47a19b6eb5e", "12ddc405-ef28-46a8-bfcd-cd0c6fea9ad6", "0197902d-302e-43cc-a66f-e743da25af21", "c0196619-127e-492c-8660-b0957edb3ba6", "aea74fab-afeb-444f-9d45-7c5eee060f8f", "097e5775-581d-489a-a0db-ad8177fff632", "4cc103bb-5c19-4b8d-baa2-8452e192f59f", "3c51017b-6ade-45be-b7c9-e706d217cb60", "39a02b63-63cc-48f7-af99-0a027758de86", "f1f62d92-7082-425f-9ac4-d0272f2b481d", "4ba32b52-371c-4eb2-9b2e-bb4e81fd5ccc", "b4662c5f-42cb-468c-beaf-fe18f00c488d", "f0de3c18-8210-482a-8554-9ad91acbd02a", "4f3dcaa9-64bf-4f06-8b54-85f6ad5c7a61", "9ba3fab7-a47f-40f2-b838-c13210c648b2", "4777138f-cb66-41db-b0d0-c8dfdb934ff9", "ddf73907-2e4c-4b15-9e13-a50ccaf864c8", "6fa89e44-020b-42f7-8c82-fb7636cd5933", "345c9afa-a00d-4aed-9f0b-5a8e9ae2298e", "3c6c9ebb-7242-4792-ab27-e0e87f965209", "e4255cf2-4f61-4703-af2c-d1f7428a27b3", "17a7c341-4b37-4a75-abf5-17fccc6fc5a0", "310dce75-1f1f-42eb-a8a2-38b99a14a809", "4dd2f881-16d0-488d-a228-62a4508ab289", "f61341c1-00a6-48cf-ac32-ccef2f7aeb77", "2ee251df-89d3-4f5b-a8a0-6780777f553e", "d6706192-a8dd-4e4f-b2fe-62fd71de65f7", "c1205cf6-67ca-404c-afcb-35be40eb6232", "9afe0a93-87a1-44e3-9cb4-02bb7ecba940", "3b6f6705-def3-462e-b422-f882e4b3fec5", "261d4f23-62f0-4b0e-b62a-0e895cb2374c", "db264eb7-b5a4-48fa-9fe4-38d6053e886e", "9f0c39b3-e7e4-4dd8-9b2b-a4b79c9e7e95", "ec48e50d-123c-4611-a159-3b855fe3c4f2", "f9b7b207-67e0-4b45-af81-d4f91ee10137", "b4ec111e-2ef4-4ca6-a3b8-3dbbe2f66172", "f8688933-b4bc-4fb3-9da6-12072baf8b96", "692fee8e-0bb0-4ab9-94cd-ac517f99c04d", "e78a8a10-b363-4282-a0e6-ee465f1b889f", "fbc7bb27-548d-4f8b-bb99-1857e80a6a07", "f5dda07d-6cbf-4d11-9586-8d9ada7fcfdf", "ab4c8286-872e-4cac-9470-8bbad873293f", "cc345639-2c28-4aa3-840e-4906ec461eda", "e35b6cdb-7141-4d93-87ce-82f6bae80eaa", "794e7812-a678-4eae-9bfd-2967e2d51791", "58b31a00-0f63-4af0-a239-a7b21d29280b", "9ad4df96-9103-4b92-aa29-173af7adb87a", "ee469817-7130-40f0-af7f-effdea464f4d", "c45206ce-d85f-4b06-a4ec-6b960e915204", "16987949-1c7f-4dce-bb5f-b42019c7a7fb", "cffbbe0c-0f82-4e25-81a4-a3456ca8e4c8", "28049cff-b9a5-4482-82e2-aa0956ef1566", "49a18b88-eb29-4c00-86c6-536c36b2c09c", "e152356f-23a3-4c93-9d0b-dfff1f2839a7", "8ddc4825-87fc-48f3-b1d5-d4394c15fae6", "b7340f34-54ff-4b24-8d9d-57ea5ea02288", "e6cd34d6-4390-498f-b9ee-cf87a2891584", "09581f13-9c6a-407d-9a16-9ad5ced682ef", "85c12a7e-2539-44ef-920f-f162f7aa94dd", "475ee4f2-32a1-4544-9c2d-6fe1d9d48201", "136fa6ea-e50b-428b-aad9-7246f61805f2", "97def8ad-986f-4339-920f-071c8bb60da0", "11d26f13-2011-44d0-b12e-ce9f413b4726", "941f7223-c6b0-46b6-81ba-ef20aa5e3554", "d05d43c4-fcd4-44a2-86b3-767c4f32d06d", "eff6dd68-b969-4a5f-9d14-d16638c071fc", "059fa73a-e3a6-4a01-841b-e653705d53e5", "7158723a-a425-4d85-b51e-89d08d026cc2", "e059a134-aca9-44e6-83ae-cc23592acc87", "7cfe14be-e467-49e6-9930-e82e682db4bf", "e6585a66-f953-47f9-9d29-0dfb3cc125f4", "2253b155-9769-4a29-ab4c-ad9af48fa7e2", "0912c99c-86d6-418b-a98a-b16a278abc06", "f4af2b02-4e6d-440b-9a89-9827c874d294", "b2019d64-a0ba-4a3e-8810-9b2370d88146", "181a39a5-e67d-4534-b2c6-6320d9bfe1e8", "fd127851-2126-4ffd-b5a6-2c6925e8dbe6", "c65e0330-6ac5-49b4-8bf4-4f6fd75dfa87", "aa0b2850-ab4b-4218-afcc-7acb7ebba736", "a042855e-491c-46df-bf54-3be892f41f8c", "ba93e775-fec4-46dd-92f1-8fddafd121de", "4f26a4e0-1aef-40a9-9120-3d63ba050e2c", "455cdd74-d198-44a0-8483-ecd160cd8cd5", "88a6fc76-c46c-41bb-b994-ae9747003ab8", "ac456333-7755-4e21-bde2-c58caf5a0b60", "b4751627-34a6-46dd-a61e-bb0dd3d8310e", "1bdceead-bbdf-4f41-aaca-3b628d4e0f33", "d540dad1-ce54-4c92-abe7-f34597bac9c0", "7b6226a6-8863-4f2f-97da-cae0c114c950", "fbc3b648-d7af-46bb-a29a-cca920a89b7d", "ef2f3539-06e2-4fca-8b4e-a8bfb0ca67f7", "d1ec5002-b96b-44b5-aa7b-9367da8249d7", "29db177c-a44e-4ef0-931f-43eeeaa9f39b", "a456db8f-24d6-477e-9fca-43e178726a1a", "676a2625-3c95-4238-b2ce-f40eb68c883d", "328aad29-3a0c-494c-8c51-92fbef798150", "d1c93ac8-fab7-41de-b614-a5545ffc4c2b", "cbcdc73d-b815-413d-952e-8d958c59f04a", "0b3b8928-d7c4-421d-a747-1469b5e859f9", "fc645900-137f-493e-8bf2-ade9555a3cd7", "0d697c9b-f0db-4070-a308-e16273b5fed1", "ebc1f1a8-2f07-4f37-b087-864171f6124f", "4f1ee958-cff3-49f4-b928-a62e84278df1", "58808401-cbe7-405e-81bd-5a9a0f68939f", "4f11907a-2a59-4cbf-8af5-aa8eb7c06d79", "6fb543c1-0e20-45d8-bb58-ffb381c7bf5d", "082f6c9a-9751-4014-ad75-71d26295aeed", "bc49483f-9434-4dfe-9a78-191b9530b044", "79174a1a-3c81-4d84-8bf0-b56150b03269", "fa80f0fc-492a-46f0-9a10-7c3d12a7cf5e", "b7d40d56-79ac-495e-a7ee-1ca1d88d92bd", "0042078e-1f0b-4e64-8c6f-38ee8296ce9b", "06d2ee1c-c200-4c29-8c58-6778bea033f5", "58fd81da-5743-4c99-8724-08fce683cb92", "e9471011-f771-4a5b-a7d8-e8653a665842", "06b92a35-b79d-452c-8209-b9ae85b7e1d2", "df18781d-3128-42bf-98b7-779bb41be632", "c4b4d12c-8908-4ea4-9855-0909b327944b", "d527e80c-0626-4ba8-bf6d-4ad68c792108", "ad6378d8-4018-4bb0-b651-35c99d593088", "7bed4465-d8b3-466a-a014-5ce1554eb3cf", "bab9dd0a-9c2e-4ce8-bd9c-9a86a8cd2c74", "7fca9a57-9811-46df-9cae-54861e007ee9", "a8387ed4-64e9-4cee-b8fb-0808b051cb91", "9cdddfd4-0979-4155-9192-bd69f08937cd", "2f058a10-96fb-44b5-affe-ec8c93461449", "562a4aad-8811-4523-8ab7-f20be2502f30", "37d14646-7f37-43fc-9b85-0b3f05f94f98", "41431e15-94fb-4fa9-aa82-7a3c5d6dc11e", "8ff1d5c4-4ef1-45ce-9fff-a60749df846d", "b5197c32-368b-41dc-ad1c-0ebbc6ed7a26", "de3b8b88-3538-4716-bfce-5263155e4f45", "8e469296-02bd-4e7e-86cb-a79b853ca183", "a47b4cbf-2ae5-4181-a775-0a3adea351de", "cb264bad-49de-43d0-a9b2-76a4e52d8b88", "660ce568-048a-4a6b-b4f6-729ac232e411", "160d2d1f-d219-4920-a33e-f0a0812f0664", "8990e321-55cc-4f3f-9602-947ca7751aab", "199228d5-86cd-4612-bf08-43e5ea8acdf2", "41ff855b-c1e9-4265-8d94-d6f2568da900", "c2a53579-3f8b-4e69-8ba3-1885be4ac8cf", "2a9349e3-890f-4bb1-9706-1c4ad27e21e4", "e5acc38b-8b97-4e18-999f-613137f6ff2d", "b4a4c250-697b-4195-b80d-1ef98e0f94b5", "c944e891-0ca1-4a6b-83af-ddfcd67a0742", "c8210e0c-d31f-445c-843e-9e7eb21efee9", "8c6a2675-32b3-469e-8595-838bfcaa574d", "16c46c3f-b8a0-409d-af1a-502c688e6447", "ea50c692-16c5-4f81-8f8f-e3717bf9304d", "c0b22903-f2fb-4452-ad28-89095dd1e05b", "b788fb2c-d768-4d0c-954a-b3243400e905", "f8f1a5d4-1bca-4921-9534-afcfd2a0a04c", "87dc9f51-7dcf-486b-acae-01eb2755a2cd", "ed083f88-119d-4ed7-a2f0-47d396b80255", "541b6728-f21f-42e7-bcf4-3cce0b909813", "dca86946-541d-481e-8e89-c4abbd48b976", "6b3594ba-5943-4269-8d0d-62d445819ba9", "6b8f3586-7b64-4125-b097-f259fcdb5252", "2e33a3e3-6524-42fa-bbae-b35d5c8f5bf0", "e64d81a7-16d1-44de-9fc0-7189378ad178", "613dde5d-a98f-4a5e-a625-534919adfec4", "cc6551a7-7f33-4c91-b9c4-15b358fb63f7", "8a079fec-678b-4d2a-80a7-57b2366f7069", "2ec6d21d-1391-48d9-a5c8-a174047baf9c", "4f8da755-6544-4615-bcb7-ac8e903f3cbb", "1b53bd23-4adc-4150-853c-08be0d377073", "b5dd5f07-da77-400a-9609-6cf65019f0f8", "4891ce9f-c353-44f2-9004-8ee9a3cebd9c", "f5385c31-8297-4f59-ae0b-84f95758cddf", "ade671ee-2999-4633-bdc7-ae3dbba96ceb", "7dce9e62-3ec7-4e76-8531-a3b2c6009fc2", "c9e8a9d1-ea96-4177-bd3b-453096f015ae", "102ae650-f26f-487f-b5d7-51b15c4769af", "f976424f-c278-4440-95d0-c72c8fd2fe0a", "3a818f38-2a84-4950-adbb-a6b16a689f31", "50657223-766e-4ef8-8243-ccac9986de8a", "b01cb1cb-59f3-4531-95eb-7b2bf2f15659", "82121bd8-e792-45af-8596-145fc0579d1f", "30b6a4be-8bbb-4b3f-8983-984bcf657bc6", "8e3e1047-4e73-4fb2-be12-f9aeb788287a", "9bfed96b-40ff-43d1-baa8-3c468cd6e9f6", "b716a186-c183-4375-8fde-b7b0d5aff192", "aa61e6e5-2ab1-4b2a-b388-6b38e62fc859", "1e20126f-2bd0-4076-99d2-3bf1ed70dc5c", "0a8d732c-c900-4dbf-9da6-e4e8309d13bd", "8da66a34-0101-4ca5-a4fd-e03d7ce97791", "edc098f4-59ab-412e-b90c-d9ae2fbd07f9", "43652d25-08e4-45ed-a9c9-d1f41b123f45", "3c7b0a82-6059-472c-87cb-8edf3c05d89d", "99a1ea9f-adb1-4b7a-85ca-e977d0550180", "1272fd24-44b9-4712-a5b6-71c12f6adc21", "b95470d6-5e92-4552-ad06-9362cc117a1e", "fb9f6da7-e0a3-42fe-a903-c97e647d9c8a", "dc029a25-dd8a-4562-be61-b6dfa0dce93f", "c1a44c5a-e2aa-4a59-bcb4-648f0e2b2845", "3c6fa95e-9f93-4358-910e-1e6a4e591a27", "820571f1-f2bc-4bfc-97f8-4b482b08d520", "2e74d377-c4ae-4273-85e1-699e0177fe38", "5df5d273-5829-45ff-bef9-dde75acc206d", "40ee3a12-2538-4c68-ad57-5d4bfedd95ab", "da535344-ebee-4233-9062-6f12d19ac71c", "cf00ca02-5846-41bf-8a8c-fc9b52702b5c", "61ad0665-36b5-4767-a1e3-bcab4f836084", "eae1849d-747c-4e64-ac46-55c53ec69f01", "2e0f8802-46b3-4b81-8e29-7328d6bb2f30", "14beda6c-915b-434c-a34c-a051481a287e", "ac8752d9-09cd-4b2e-b26a-72a4d3803fcc", "11b29ea9-535a-46fc-90af-606ca30ecb24", "897712a0-a397-40fa-b97c-d29ff4cfbbd0", "1576ea31-79e2-45ee-86ab-c39805e58d2e", "7b1b776f-936f-479f-8b92-3b71a3236252", "7e2607d4-7105-4422-9b0e-910725a13c18", "3f411552-c820-42e8-bb94-4ca63b53aa94", "3c602b6d-d6f0-4bb5-b4fd-a228c34f2308", "cfb12122-55d7-456c-a44f-7cf394ff6e96", "717a000c-87cb-4401-aee6-cb4d92d2c811", "f2503765-23cc-417a-9930-47c863482aa0", "a161005c-fd64-4579-a1b0-e632681246e4", "78578af5-558d-4801-9dba-556deaaf766e", "4bc213c0-08f2-486b-8ab3-541e9b5c24b2", "0dc05574-46c8-4adb-98c5-28d080964ce5", "92130a93-2995-4809-896f-de4a936ce600", "1619a2ba-5f3c-4c5b-bdcc-f067941153d0", "0f58cc65-ad54-4c4c-ac72-645a389f5031", "885a51a9-973b-4c43-9519-17c0b4cb9382", "ede48362-d033-469d-829c-d8cf1bc1d9a0", "ed1beeb2-8de9-48aa-ac1e-3ed870fb63a1", "80d62c0c-97da-4065-86ec-4e133cc03d51", "e7aec251-28c2-4c7a-8b2e-63d27f0c736d", "737b08b2-439b-485e-9907-8cc65f50ca42", "a3918fba-cfbb-4c3c-9f0d-dbd4d1b1a32f", "6ac18bad-a699-49c6-a693-cacbb8bec5ce", "edc503d8-d018-4ab2-984f-3de3f8477c8e", "74270ea8-d194-40d4-8e96-d1c6b38781df", "d550e726-1e05-43d5-ac13-9a6e7c4f7546", "01c090da-681b-4d79-8a22-f689315abd8c", "bc4aaade-58a6-43c8-a3a0-d8970c720d14", "7ff84e7b-7d63-43d1-8cef-4db31fd206f9", "f07ec3ba-32ee-47ca-96ea-65c2bd106967", "4a819960-7587-4f70-bf6e-af463692c56b", "31a66313-4020-4f94-8b57-b351e602bba9", "8b61776e-8457-4804-ab70-d4cd74f18a0e", "fcde605c-791a-4b5c-b281-c892b8adef6f", "cc3db541-d7a1-4bf1-af38-9a709174f2c9", "5ced117f-0b6b-47b6-9680-2fa2138b804b", "5d3e3438-1b1d-4bb7-a69a-798326bc6a46", "cd7677f3-ab63-46c1-a06d-194551935f8f", "dc526a37-6c24-488a-a8b6-7c81125c1a3a", "5d6008e9-20ef-4d4d-89df-0360f979e495", "869ba61b-065d-4995-9b8b-fa67385ec2c5", "dd5d07fb-f45a-44a5-9148-59e781e95fa7", "2416b0b2-bba7-4466-9c0a-694141d5b2d3", "78a7dbcf-4fde-47b8-9778-f8eca1624a71", "6368dea5-8ddd-4995-92b4-3ebe581b8bef", "c025283d-4be0-46b5-b185-bd9bd34ea89d", "f61dbb15-f5ff-49e3-bcd1-16f5d02fdfaf", "6da08950-43d9-4dd1-8600-6a8d3afb820f", "146e6086-09fa-466e-9c06-e15224cf7324", "e976c523-ac66-4c5e-b52c-c170745dc537", "b9b370ae-9ba6-4ba8-9fd5-60a0eb091df0", "bc54646d-9dcf-4b3b-8a08-d470b2431775", "e7b4314c-b986-4660-b63b-73d9b7e217c8", "80391a8e-236e-4f6a-aa4b-b81f82193d6e", "a27460af-1650-4bd6-a3b0-93940f89a352", "46697f20-6a15-4adc-9f27-04e8c86731c1", "0f0b15d2-1f23-4350-aa0f-5bac3a52ac29", "f8152a16-5f63-42c7-8e2c-67d7dabc52ec", "2624691a-b890-47b9-bf32-b3fdc02c1cd4"];

const isDevelop = process.env.NODE_ENV === "development";

const HomePageComponent: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFreePackageBottomSheetOpen, setFreePackageBottomSheetOpen] = useState(false);
  const me = useMeQuery({ fetchPolicy: "cache-and-network" });

  const {
    data,
    refetch: refetchUserPackages,
    loading: userPackagesLoading,
  } = useUserPackagesQuery({ fetchPolicy: "cache-and-network" });

  const [logout] = useLogoutMutation();
  const [enableGift, enableGiftData] = useEnableGiftMutation();
  const [enableTodayFreePackage, enableTodayFreePackageData] = useEnableTodayFreePackageMutation();

  useEffect(() => {
    if ((!me.loading || me.data) && (!userPackagesLoading || data)) {
      setIsLoading(false);
    }
  }, [data, me.data, me.loading, userPackagesLoading]);

  useEffect(() => {
    if (me.data?.me.isVerified === false) {
      router.replace("/auth/verify-phone");
    }
  }, [router, me.data]);

  const handleLogout = () => {
    logout().then(() => {
      clearLocalStorageExcept("appVersion");
      router.replace("/login");
    });
  };

  const handleEnableGift = () => {
    enableGift({
      update: () => {
        const existingData = client.readQuery<MeQuery>({ query: MeDocument });
        if (existingData) {
          const updatedMe = existingData.me && { ...existingData.me, userGift: [] };
          client.writeQuery({
            query: MeDocument,
            data: { me: updatedMe },
          });
        }
      },
    }).then(() => {
      refetchUserPackages();
    });
  };
  const handleEnableFreePackage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    accountIsBlocked(e);
    if (isBlocked) return;
    enableTodayFreePackage().then(() => {
      setFreePackageBottomSheetOpen(true);
    });
  };


  const isAliAkbarUsers = akbarUsers.includes(me.data?.me.id || '');


  const botRef = `https://t.me/${me.data?.me.brand?.botUsername}?start=${jsonToB64Url({ uid: me.data?.me.id || "" })}`;
  const isAdmin = me?.data?.me.role !== "USER";
  const balance = me.data?.me.balance || 0;
  const isBlocked = isAliAkbarUsers || me.data?.me.isDisabled || me.data?.me.isParentDisabled || false;
  const isRegisteredInTelegram = me?.data?.me.telegram?.id;
  const hasBankCard = me.data?.me.bankCard?.[0]?.number;
  const registerToBotText = isAdmin ? "ثبت نام در ربات تلگرام" : "پیش از اتمام بسته خبردارم کن (عضویت ربات تلگرام)";
  const hasPackage = Boolean(data?.userPackages?.length);
  const gif = me.data?.me?.userGift?.[0]?.giftPackage?.traffic;
  const hasFreePackage = me.data?.me.parent?.freePackageId ? true : false;

  const handleBuyPackageClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    accountIsBlocked(e);
    checkAdminRequirements(e);
  };
  const handleGetCustomersClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    pleaseCharge(e);
    accountIsBlocked(e);
    checkAdminRequirements(e);
  };

  const pleaseCharge = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (balance <= 0 && isAdmin) {
      e.preventDefault();
      toast({ variant: "destructive", description: "ابتدا حساب خود را شارژ کنید." });
    }
  };

  const accountIsBlocked = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    if (isBlocked) {
      e.preventDefault();
      toast({ variant: "destructive", description: "حساب شما مسدود شده است." });
    }
  };

  const checkAdminRequirements = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isRegisteredInTelegram && isAdmin && !isDevelop) {
      e.preventDefault();
      toast({ variant: "destructive", description: "لطفا در ربات تلگرام عضو شوید." });
    }

    if (!hasBankCard && isAdmin) {
      e.preventDefault();
      toast({ variant: "destructive", description: "از قسمت تنظیمات حساب بانکی خود را وارد کنید." });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data && me.data?.me.isVerified === true) {
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
        <div className="w-full space-y-4">
          <div className="space-y-2 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between ">
              <div className="truncate text-sm text-slate-700">{me.data?.me?.fullname}</div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="mr-4 flex items-center rounded-full px-4 py-2 text-xs text-slate-400"
              >
                <span>خروج</span>
                <PowerIcon className="mr-2 size-4" />
              </Button>
            </div>
            {isAdmin && (
              <>
                <div
                  className={`text-xs ${
                    (me.data?.me.balance || 0) < 0 ? "font-black text-red-500" : "text-slate-500"
                  } `}
                >
                  شارژ حساب: {toIRR(roundTo(me.data?.me.balance || 0, 0))}
                </div>
              </>
            )}
          </div>
          <Link className="flex" href="/package-categories" onClick={handleBuyPackageClick}>
            <Button className="flex w-full">
              <PlusIcon className="ml-2 size-5" />
              <span>خرید بسته جدید</span>
            </Button>
          </Link>
          {isAliAkbarUsers && (
            <div className="bg-orange-50 text-orange-800 p-4 rounded-md text-sm/7">
              {(new Date(me.data.me.createdAt) < new Date('2025-01-25'))}
              <strong className="font-black">اطلاعیه مهم</strong>  
              <br />
              به اطلاع می‌رسانیم که نماینده‌ای که پیش‌تر از طریق ایشان اشتراک خود را تهیه می‌کردید، از این پس فعالیت خود را به‌صورت مستقل ادامه خواهد داد و دیگر با مجموعه ما همکاری ندارد.
              <br />
              لطفاً برای تمدید یا دریافت خدمات، مستقیماً از طریق کانال‌های ارتباطی جدیدی که ایشان معرفی کرده‌اند اقدام فرمایید.
              <br />
              <br />
              با احترام،
              <br />
              <strong>تیم پشتیبانی وصل‌کن</strong>
            </div>
          )}
          {/* {me.data?.me.createdAt && new Date(me.data.me.createdAt) < new Date('2025-01-29') && (
            <div className="bg-green-50 text-green-800 p-4 rounded-md text-sm/7">
              {(new Date(me.data.me.createdAt) < new Date('2025-01-25'))}
              <strong className="font-black">خبر خوب + هدیه ویژه!</strong>  
              <br />
              <br />
              مشکل سرویس برطرف شده و حالا <strong>همه چی سریع‌تر و پایدارتر از قبل</strong>ه! 💪  
              برای جبران، <strong>۲۰٪ حجم بیشتر</strong> روی هر خریدتون (و تمدید)  هدیه می‌دیم! 🎁  
              <br />
              <br />
              ✅ <strong>فقط خرید کنین و حجم بیشتر بگیرین!</strong>  
              <br />
              ⏳ <strong>فرصت محدوده، پس از دست ندین!</strong>  
            </div>
          )} */}
          {/* {me.data?.me.createdAt && new Date(me.data.me.createdAt) < new Date('2025-02-05') && (
            <div className="bg-red-50 text-red-900 p-4 rounded-md text-sm/7">
              متاسفانه زیر ساخت شاتل دچار مشکل شده و سرور های خریداری شده توسط شما دچار مشکل شدند.
              <br />
              ما در حال تلاش هستیم که مشکل را از سمت دیتاسنتر پیگیری و برطرف کنیم.
              <br />
               عذرخواهی می‌کنیم بابت مشکل پیش اومده.
            </div>
          )} */}
          {gif && (
            <Button
              variant="outline"
              disabled={enableGiftData.loading}
              className="flex w-full"
              onClick={handleEnableGift}
            >
              <span> {enableGiftData.loading ? "در حال فعال‌سازی..." : `فعال سازی ${gif} گیگ هدیه 🎁🥳`}</span>
            </Button>
          )}
          {hasFreePackage && (
            <Button
              variant="outline"
              disabled={enableTodayFreePackageData.loading}
              className="flex w-full"
              onClick={handleEnableFreePackage}
            >
              <span>دریافت بسته رایگان امروز 🎈</span>
            </Button>
          )}
          {isAdmin && (
            <Link className="flex" href="/customers" onClick={handleGetCustomersClick}>
              <Button variant="outline" className="flex w-full">
                <UsersIcon className="ml-2 size-5" />
                <span>مشتری‌ها</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/rechargePackages" onClick={checkAdminRequirements}>
              <Button variant="outline" className="flex w-full">
                <BanknotesIcon className="ml-2 size-5" />
                <span>افزایش شارژ حساب</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/setting">
              <Button variant="outline" className="flex w-full">
                <Cog6ToothIcon className="ml-2 size-5" />
                <span>تنظیمات</span>
              </Button>
            </Link>
          )}
          {data.userPackages?.map((userPackage) => (
            <Stat key={userPackage.id} pack={userPackage} onRenewClick={handleBuyPackageClick} />
          ))}

          {!isRegisteredInTelegram && (data.userPackages.length > 0 || isAdmin) && (
            <a className="block" href={botRef}>
              <Button variant="outline" className="flex w-full">
                <TelegramIcon className="ml-2 size-5" />
                <span>{registerToBotText}</span>
              </Button>
            </a>
          )}
          <div className="flex flex-row-reverse space-x-4">
            {me.data?.me.parent?.telegram?.username && (
              <a
                target="_blank"
                rel="noreferrer"
                className="flex w-full"
                href={`https://t.me/${me.data?.me.parent?.telegram?.username}`}
              >
                <Button variant="outline" className="flex w-full">
                  <ChatBubbleOvalLeftIcon className="ml-2 size-5" />
                  <span>پشتیبانی تلگرام</span>
                </Button>
              </a>
            )}
            {hasPackage && (
              <Link className="flex w-full" href="/help">
                <Button variant="outline" className="flex w-full">
                  <InformationCircleIcon className="ml-2 size-5" />
                  <span>آموزش اتصال</span>
                </Button>
              </Link>
            )}
          </div>
          {/* <UpdateMessagePopup /> */}
          <FreePackageBottomSheet
            isOpen={isFreePackageBottomSheetOpen}
            onClose={() => setFreePackageBottomSheetOpen(false)}
            freePackage={enableTodayFreePackageData.data?.enableTodayFreePackage}
            promotionCode={
              me.data.me.parent?.promotion?.length
                ? me.data.me.parent?.promotion[0].code
                : removeWWW(window.location.host) === "vaslshim.com"
                  ? "save"
                  : "vvip"
            }
          />
        </div>
      </div>
    );
  }
};

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname !== window.location.pathname) {
      const idPattern = /^\/([\w-]+)$/;

      const match = window.location.pathname.match(idPattern);

      if (match) {
        const promoCode = match[1]; // Extract the alphanumeric id part
        router.replace({
          pathname: "/[promoCode]",
          query: { promoCode },
        });
      } else {
        router.replace(window.location.pathname); // Directly replace for other paths
      }
    }
  }, [router]);

  // // Only render the HomePageContent if the current route is "/"
  if (window.location.pathname !== "/") {
    return null;
  }

  return <HomePageComponent />;
};

export default HomePage;

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
