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

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
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
};

export type CreateServerInput = {
  domain: Scalars['String']['input'];
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
  value: Array<DnsValue>;
};

export type DnsValue = {
  __typename?: 'DnsValue';
  country: Scalars['String']['output'];
  ip: Scalars['String']['output'];
  port: Scalars['String']['output'];
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

export type GetClientStatsFiltersInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type IssueCertInput = {
  domain: Scalars['String']['input'];
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
  changePassword: User;
  issueCert: Domain;
  login: Auth;
  refreshToken: Token;
  signup: Auth;
  updatePort: Dns;
  updateUser: User;
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


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
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


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdatePortArgs = {
  data: UpdateDnsPortInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  clientStats: Array<ClientStat>;
  domains: Array<Domain>;
  hello: Scalars['String']['output'];
  helloWorld: Scalars['String']['output'];
  me: User;
};


export type QueryClientStatsArgs = {
  filters?: InputMaybe<GetClientStatsFiltersInput>;
};


export type QueryDomainsArgs = {
  filters?: InputMaybe<DomainsFiltersInput>;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
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
  ip: Scalars['String']['output'];
  token: Scalars['String']['output'];
  type: ServerCountry;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** ServerCountry */
export enum ServerCountry {
  De = 'DE',
  Nl = 'NL'
}

export type SignupInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type UpdateDnsPortInput = {
  domain: Scalars['String']['input'];
  port: Scalars['String']['input'];
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  role: Role;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};
