export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigNumber: { input: any; output: any };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  JWT: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type BankCard = {
  __typename?: "BankCard";
  name: Scalars["String"]["output"];
  number: Scalars["String"]["output"];
};

export type Brand = {
  __typename?: "Brand";
  botUsername: Scalars["String"]["output"];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  domainName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  logo?: Maybe<Scalars["JSON"]["output"]>;
  title: Scalars["String"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

export type BuyPackageInput = {
  name: Scalars["String"]["input"];
  packageId: Scalars["String"]["input"];
  receipt?: InputMaybe<Scalars["String"]["input"]>;
};

export type BuyRechargePackageInput = {
  receipt: Scalars["String"]["input"];
  rechargePackageId: Scalars["String"]["input"];
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type CheckAuth = {
  __typename?: "CheckAuth";
  loggedIn: Scalars["Boolean"]["output"];
};

export type Child = {
  __typename?: "Child";
  activePackages: Scalars["Int"]["output"];
  appliedDiscountPercent?: Maybe<Scalars["Float"]["output"]>;
  balance: Scalars["Float"]["output"];
  bankCard?: Maybe<Array<BankCard>>;
  brand?: Maybe<Brand>;
  brandId: Scalars["String"]["output"];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  fullname: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  initialDiscountPercent?: Maybe<Scalars["Float"]["output"]>;
  isDisabled?: Maybe<Scalars["Boolean"]["output"]>;
  isParentDisabled?: Maybe<Scalars["Boolean"]["output"]>;
  isVerified: Scalars["Boolean"]["output"];
  lastConnectedAt?: Maybe<Scalars["DateTime"]["output"]>;
  maxRechargeDiscountPercent?: Maybe<Scalars["Float"]["output"]>;
  onlinePackages: Scalars["Int"]["output"];
  otp?: Maybe<Scalars["String"]["output"]>;
  otpExpiration?: Maybe<Scalars["DateTime"]["output"]>;
  parent?: Maybe<Parent>;
  parentId?: Maybe<Scalars["String"]["output"]>;
  phone: Scalars["String"]["output"];
  profitBalance: Scalars["Float"]["output"];
  profitPercent: Scalars["Float"]["output"];
  promotion?: Maybe<Array<PromotionCode>>;
  referId?: Maybe<Scalars["String"]["output"]>;
  role: Role;
  telegram?: Maybe<TelegramUser>;
  totalProfit: Scalars["Float"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userGift?: Maybe<Array<UserGift>>;
};

export type ClientStat = {
  __typename?: "ClientStat";
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  down: Scalars["BigNumber"]["output"];
  email: Scalars["String"]["output"];
  enable: Scalars["Boolean"]["output"];
  expiryTime: Scalars["BigNumber"]["output"];
  id: Scalars["ID"]["output"];
  lastConnectedAt?: Maybe<Scalars["DateTime"]["output"]>;
  total: Scalars["BigNumber"]["output"];
  up: Scalars["BigNumber"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

export type CreatePromotionInput = {
  code: Scalars["String"]["input"];
  giftPackageId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type DeletePromotionInput = {
  promotionId: Scalars["ID"]["input"];
};

export type EnterCostInput = {
  amount: Scalars["Int"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  type: PaymentType;
};

export type GetBrandInfoInput = {
  domainName: Scalars["String"]["input"];
};

export type GetClientStatsFiltersInput = {
  id: Scalars["String"]["input"];
};

export type GetOptinetflowCustomerInfoInput = {
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  fullname: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type GetPackageInput = {
  category?: InputMaybe<PackageCategory>;
  expirationDays?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Login = {
  __typename?: "Login";
  isPromoCodeValid?: Maybe<Scalars["Boolean"]["output"]>;
  loggedIn?: Maybe<LoginData>;
};

export type LoginData = {
  __typename?: "LoginData";
  tokens: Token;
  user: User;
};

export type LoginInput = {
  domainName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  buyPackage: Scalars["String"]["output"];
  buyRechargePackage: User;
  changePassword: User;
  createPromotionCode: Promotion;
  deletePromotionCode: Scalars["Boolean"]["output"];
  enableGift: Scalars["Boolean"]["output"];
  enableTodayFreePackage?: Maybe<UserPackageOutput>;
  enterCost: User;
  login: Login;
  logout: Scalars["Boolean"]["output"];
  notifOptinetflowCustomerInfoToUs: Scalars["Boolean"]["output"];
  refreshToken: Token;
  renewPackage: Scalars["String"]["output"];
  resetPassword: Scalars["Boolean"]["output"];
  sendForgetPasswordOtp: Scalars["Boolean"]["output"];
  sendOtpAgain: Scalars["Boolean"]["output"];
  signup: Scalars["Boolean"]["output"];
  updateChild: User;
  updatePhone: Scalars["Boolean"]["output"];
  updateUser: User;
  uploadImage: Scalars["String"]["output"];
  verifyPhone: Token;
};

export type MutationBuyPackageArgs = {
  data: BuyPackageInput;
};

export type MutationBuyRechargePackageArgs = {
  input: BuyRechargePackageInput;
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationCreatePromotionCodeArgs = {
  data: CreatePromotionInput;
};

export type MutationDeletePromotionCodeArgs = {
  data: DeletePromotionInput;
};

export type MutationEnterCostArgs = {
  input: EnterCostInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationNotifOptinetflowCustomerInfoToUsArgs = {
  data: GetOptinetflowCustomerInfoInput;
};

export type MutationRefreshTokenArgs = {
  token: Scalars["JWT"]["input"];
};

export type MutationRenewPackageArgs = {
  input: RenewPackageInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSendForgetPasswordOtpArgs = {
  data: SendForgetPasswordOtpInput;
};

export type MutationSendOtpAgainArgs = {
  data: SendOtpAgainInput;
};

export type MutationSignupArgs = {
  data: SignupInput;
};

export type MutationUpdateChildArgs = {
  input: UpdateChildInput;
};

export type MutationUpdatePhoneArgs = {
  data: UpdatePhoneInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUploadImageArgs = {
  input: UploadInput;
};

export type MutationVerifyPhoneArgs = {
  data: VerifyPhoneInput;
};

export type Package = {
  __typename?: "Package";
  category: PackageCategory;
  categoryFa?: Maybe<Scalars["String"]["output"]>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  discountedPrice?: Maybe<Scalars["Int"]["output"]>;
  expirationDays: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  price: Scalars["Int"]["output"];
  traffic: Scalars["Float"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
  userCount: Scalars["Int"]["output"];
};

/** Package Category */
export enum PackageCategory {
  Economic = "ECONOMIC",
  Quality = "QUALITY",
}

export type Parent = {
  __typename?: "Parent";
  bankCard?: Maybe<Array<BankCard>>;
  freePackageId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  telegram?: Maybe<ParentTelegram>;
};

export type ParentTelegram = {
  __typename?: "ParentTelegram";
  username?: Maybe<Scalars["String"]["output"]>;
};

/** Payment Type */
export enum PaymentType {
  ExternalServerCost = "EXTERNAL_SERVER_COST",
  IranServerCost = "IRAN_SERVER_COST",
  PackagePurchase = "PACKAGE_PURCHASE",
  WalletRecharge = "WALLET_RECHARGE",
}

export type Promotion = {
  __typename?: "Promotion";
  code: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  giftPackage?: Maybe<Package>;
  id: Scalars["ID"]["output"];
  parentUser: User;
  updatedAt: Scalars["DateTime"]["output"];
};

export type PromotionCode = {
  __typename?: "PromotionCode";
  code: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  checkAuth: CheckAuth;
  children: Array<Child>;
  clientStats: Array<ClientStat>;
  getBrandInfo: Brand;
  getPromotionCodes: Array<Promotion>;
  hello: Scalars["String"]["output"];
  helloWorld: Scalars["String"]["output"];
  me: User;
  packages: Array<Package>;
  rechargePackages: Array<RechargePackage>;
  userPackages: Array<UserPackageOutput>;
};

export type QueryClientStatsArgs = {
  filters: GetClientStatsFiltersInput;
};

export type QueryGetBrandInfoArgs = {
  input: GetBrandInfoInput;
};

export type QueryHelloArgs = {
  name: Scalars["String"]["input"];
};

export type QueryPackagesArgs = {
  data: GetPackageInput;
};

export type RechargePackage = {
  __typename?: "RechargePackage";
  amount: Scalars["Float"]["output"];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  discountPercent: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

export type RenewPackageInput = {
  packageId: Scalars["String"]["input"];
  receipt?: InputMaybe<Scalars["String"]["input"]>;
  userPackageId: Scalars["String"]["input"];
};

export type ResetPasswordInput = {
  domainName: Scalars["String"]["input"];
  otp: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

/** User role */
export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type SendForgetPasswordOtpInput = {
  domainName: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type SendOtpAgainInput = {
  domainName: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
};

export type SignupInput = {
  domainName: Scalars["String"]["input"];
  fullname: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  promoCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type TelegramUser = {
  __typename?: "TelegramUser";
  bigAvatar?: Maybe<Scalars["String"]["output"]>;
  chatId?: Maybe<Scalars["BigNumber"]["output"]>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  firstname?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  lastname?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  smallAvatar?: Maybe<Scalars["String"]["output"]>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
  username?: Maybe<Scalars["String"]["output"]>;
};

export type Token = {
  __typename?: "Token";
  /** JWT access token */
  accessToken: Scalars["JWT"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["JWT"]["output"];
};

export type UpdateChildInput = {
  childId: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  fullname?: InputMaybe<Scalars["String"]["input"]>;
  initialDiscountPercent?: InputMaybe<Scalars["Float"]["input"]>;
  isDisabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Role>;
};

export type UpdatePhoneInput = {
  domainName: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type UpdateUserInput = {
  cardBandName?: InputMaybe<Scalars["String"]["input"]>;
  cardBandNumber?: InputMaybe<Scalars["String"]["input"]>;
  fullname?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  profitPercent?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UploadInput = {
  image: Scalars["Upload"]["input"];
};

export type User = {
  __typename?: "User";
  appliedDiscountPercent?: Maybe<Scalars["Float"]["output"]>;
  balance: Scalars["Float"]["output"];
  bankCard?: Maybe<Array<BankCard>>;
  brand?: Maybe<Brand>;
  brandId: Scalars["String"]["output"];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  fullname: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  initialDiscountPercent?: Maybe<Scalars["Float"]["output"]>;
  isDisabled?: Maybe<Scalars["Boolean"]["output"]>;
  isParentDisabled?: Maybe<Scalars["Boolean"]["output"]>;
  isVerified: Scalars["Boolean"]["output"];
  maxRechargeDiscountPercent?: Maybe<Scalars["Float"]["output"]>;
  otp?: Maybe<Scalars["String"]["output"]>;
  otpExpiration?: Maybe<Scalars["DateTime"]["output"]>;
  parent?: Maybe<Parent>;
  parentId?: Maybe<Scalars["String"]["output"]>;
  phone: Scalars["String"]["output"];
  profitBalance: Scalars["Float"]["output"];
  profitPercent: Scalars["Float"]["output"];
  promotion?: Maybe<Array<PromotionCode>>;
  referId?: Maybe<Scalars["String"]["output"]>;
  role: Role;
  telegram?: Maybe<TelegramUser>;
  totalProfit: Scalars["Float"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userGift?: Maybe<Array<UserGift>>;
};

export type UserGift = {
  __typename?: "UserGift";
  giftPackage?: Maybe<Package>;
  isGiftUsed: Scalars["Boolean"]["output"];
};

export type UserPackageOutput = {
  __typename?: "UserPackageOutput";
  category: PackageCategory;
  categoryFa?: Maybe<Scalars["String"]["output"]>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  expiryTime: Scalars["BigNumber"]["output"];
  id: Scalars["ID"]["output"];
  lastConnectedAt?: Maybe<Scalars["DateTime"]["output"]>;
  link: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  remainingTraffic: Scalars["BigNumber"]["output"];
  totalTraffic: Scalars["BigNumber"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

export type VerifyPhoneInput = {
  domainName: Scalars["String"]["input"];
  otp: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
};
