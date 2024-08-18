export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigNumber: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JWT: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Arvan = {
  __typename?: 'Arvan';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nsKeys: Array<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiredAt?: Maybe<Scalars['DateTime']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
  user: User;
};

export type BankCard = {
  __typename?: 'BankCard';
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
};

export type BuyPackageInput = {
  name: Scalars['String']['input'];
  packageId: Scalars['String']['input'];
  receipt?: InputMaybe<Scalars['String']['input']>;
};

export type BuyRechargePackageInput = {
  receipt: Scalars['String']['input'];
  rechargePackageId: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CheckAuth = {
  __typename?: 'CheckAuth';
  loggedIn: Scalars['Boolean']['output'];
};

export type Child = {
  __typename?: 'Child';
  activePackages: Scalars['Int']['output'];
  appliedDiscountPercent?: Maybe<Scalars['Float']['output']>;
  balance: Scalars['Float']['output'];
  bankCard?: Maybe<Array<BankCard>>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  initialDiscountPercent?: Maybe<Scalars['Float']['output']>;
  isDisabled?: Maybe<Scalars['Boolean']['output']>;
  isParentDisabled?: Maybe<Scalars['Boolean']['output']>;
  lastConnectedAt?: Maybe<Scalars['DateTime']['output']>;
  maxRechargeDiscountPercent?: Maybe<Scalars['Float']['output']>;
  onlinePackages: Scalars['Int']['output'];
  parent?: Maybe<Parent>;
  parentId?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  profitBalance: Scalars['Float']['output'];
  profitPercent: Scalars['Float']['output'];
  referId?: Maybe<Scalars['String']['output']>;
  role: Role;
  telegram?: Maybe<TelegramUser>;
  totalProfit: Scalars['Float']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  userGift?: Maybe<Array<UserGift>>;
};

export type ClientStat = {
  __typename?: 'ClientStat';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  down: Scalars['BigNumber']['output'];
  email: Scalars['String']['output'];
  enable: Scalars['Boolean']['output'];
  expiryTime: Scalars['BigNumber']['output'];
  id: Scalars['ID']['output'];
  total: Scalars['BigNumber']['output'];
  up: Scalars['BigNumber']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateArvanAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateDomainInput = {
  arvanAccount: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  expiredAt?: InputMaybe<Scalars['String']['input']>;
  serverDomain: Scalars['String']['input'];
};

export type CreateServerInput = {
  domain: Scalars['String']['input'];
  inboundId: Scalars['Int']['input'];
  ip: Scalars['String']['input'];
  type: ServerCountry;
};

export type Dns = {
  __typename?: 'Dns';
  cloud: Scalars['Boolean']['output'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ttl: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  upstream_https: UpstreamHttps;
  value: Array<DnsValue>;
};

export type DnsValue = {
  __typename?: 'DnsValue';
  country: Scalars['String']['output'];
  ip: Scalars['String']['output'];
  port?: Maybe<Scalars['String']['output']>;
  weight: Scalars['Int']['output'];
};

export type Domain = {
  __typename?: 'Domain';
  arvanSslState: DomainState;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  domain: Scalars['String']['output'];
  expiredAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  letsEncryptSsl: DomainState;
  nsState: DomainState;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Domain state */
export enum DomainState {
  Applied = 'APPLIED',
  Pending = 'PENDING'
}

export type DomainsFiltersInput = {
  arvanSslState?: InputMaybe<DomainState>;
  domain?: InputMaybe<Scalars['String']['input']>;
  letsEncryptSsl?: InputMaybe<DomainState>;
  nsState?: InputMaybe<DomainState>;
};

export type EnterCostInput = {
  amount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  type: PaymentType;
};

export type GetClientStatsFiltersInput = {
  id: Scalars['String']['input'];
};

export type IssueCertInput = {
  domain: Scalars['String']['input'];
};

export type Login = {
  __typename?: 'Login';
  isPromoCodeValid?: Maybe<Scalars['Boolean']['output']>;
  loggedIn?: Maybe<LoginData>;
};

export type LoginData = {
  __typename?: 'LoginData';
  tokens: Token;
  user: User;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addArvanAccount: Arvan;
  addDomain: Domain;
  addServer: Server;
  buyPackage: Scalars['String']['output'];
  buyRechargePackage: User;
  changePassword: User;
  enterCost: User;
  issueCert: Domain;
  login: Login;
  logout: Scalars['Boolean']['output'];
  refreshToken: Token;
  renewPackage: Scalars['String']['output'];
  signup: Auth;
  updateArvanSslStates: Scalars['Boolean']['output'];
  updateChild: User;
  updateIp: Array<Dns>;
  updateLetsEncryptSslStates: Scalars['Boolean']['output'];
  updateNsStates: Scalars['Boolean']['output'];
  updatePort: Dns;
  updateUser: User;
  uploadImage: Scalars['String']['output'];
};


export type MutationAddArvanAccountArgs = {
  data: CreateArvanAccountInput;
};


export type MutationAddDomainArgs = {
  data: CreateDomainInput;
};


export type MutationAddServerArgs = {
  data: CreateServerInput;
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


export type MutationEnterCostArgs = {
  input: EnterCostInput;
};


export type MutationIssueCertArgs = {
  data: IssueCertInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT']['input'];
};


export type MutationRenewPackageArgs = {
  input: RenewPackageInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateChildArgs = {
  input: UpdateChildInput;
};


export type MutationUpdateIpArgs = {
  data: UpdateDnsIpInput;
};


export type MutationUpdatePortArgs = {
  data: UpdateDnsPortInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUploadImageArgs = {
  input: UploadInput;
};

export type Package = {
  __typename?: 'Package';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  expirationDays: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Int']['output'];
  traffic: Scalars['Float']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  userCount: Scalars['Int']['output'];
};

export type Parent = {
  __typename?: 'Parent';
  bankCard?: Maybe<Array<BankCard>>;
  id: Scalars['String']['output'];
  telegram?: Maybe<ParentTelegram>;
};

export type ParentTelegram = {
  __typename?: 'ParentTelegram';
  username?: Maybe<Scalars['String']['output']>;
};

/** Payment Type */
export enum PaymentType {
  ExternalServerCost = 'EXTERNAL_SERVER_COST',
  IranServerCost = 'IRAN_SERVER_COST',
  PackagePurchase = 'PACKAGE_PURCHASE',
  WalletRecharge = 'WALLET_RECHARGE'
}

export type Query = {
  __typename?: 'Query';
  checkAuth: CheckAuth;
  children: Array<Child>;
  clientStats: Array<ClientStat>;
  domains: Array<Domain>;
  hello: Scalars['String']['output'];
  helloWorld: Scalars['String']['output'];
  me: User;
  packages: Array<Package>;
  rechargePackages: Array<RechargePackage>;
  userPackages: Array<UserPackage>;
};


export type QueryClientStatsArgs = {
  filters: GetClientStatsFiltersInput;
};


export type QueryDomainsArgs = {
  filters?: InputMaybe<DomainsFiltersInput>;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
};

export type RechargePackage = {
  __typename?: 'RechargePackage';
  amount: Scalars['Float']['output'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  discountPercent: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type RenewPackageInput = {
  packageId: Scalars['String']['input'];
  receipt?: InputMaybe<Scalars['String']['input']>;
  userPackageId: Scalars['String']['input'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Server = {
  __typename?: 'Server';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  domain: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inboundId: Scalars['Int']['output'];
  ip: Scalars['String']['output'];
  token: Scalars['String']['output'];
  type: ServerCountry;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** ServerCountry */
export enum ServerCountry {
  De = 'DE',
  Ir = 'IR',
  Nl = 'NL',
  Tr = 'TR'
}

export type SignupInput = {
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  promoCode?: InputMaybe<Scalars['String']['input']>;
};

export type TelegramUser = {
  __typename?: 'TelegramUser';
  bigAvatar?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigNumber']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  smallAvatar?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type UpdateChildInput = {
  childId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  isDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type UpdateDnsIpInput = {
  domain: Scalars['String']['input'];
  ip: Scalars['String']['input'];
};

export type UpdateDnsPortInput = {
  domain: Scalars['String']['input'];
  port: Scalars['String']['input'];
};

export type UpdateUserInput = {
  cardBandName?: InputMaybe<Scalars['String']['input']>;
  cardBandNumber?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UploadInput = {
  image: Scalars['Upload']['input'];
};

/** Upstream Https */
export enum UpstreamHttps {
  Auto = 'auto',
  Default = 'default',
  Http = 'http',
  Https = 'https'
}

export type User = {
  __typename?: 'User';
  appliedDiscountPercent?: Maybe<Scalars['Float']['output']>;
  balance: Scalars['Float']['output'];
  bankCard?: Maybe<Array<BankCard>>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  initialDiscountPercent?: Maybe<Scalars['Float']['output']>;
  isDisabled?: Maybe<Scalars['Boolean']['output']>;
  isParentDisabled?: Maybe<Scalars['Boolean']['output']>;
  maxRechargeDiscountPercent?: Maybe<Scalars['Float']['output']>;
  parent?: Maybe<Parent>;
  parentId?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  profitBalance: Scalars['Float']['output'];
  profitPercent: Scalars['Float']['output'];
  referId?: Maybe<Scalars['String']['output']>;
  role: Role;
  telegram?: Maybe<TelegramUser>;
  totalProfit: Scalars['Float']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  userGift?: Maybe<Array<UserGift>>;
};

export type UserGift = {
  __typename?: 'UserGift';
  giftPackage?: Maybe<Package>;
  isGiftUsed: Scalars['Boolean']['output'];
};

export type UserPackage = {
  __typename?: 'UserPackage';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  expiryTime: Scalars['BigNumber']['output'];
  id: Scalars['ID']['output'];
  lastConnectedAt?: Maybe<Scalars['DateTime']['output']>;
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  remainingTraffic: Scalars['BigNumber']['output'];
  totalTraffic: Scalars['BigNumber']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};
