import {
  AgeRestrictionTypes,
  CulturalCategoryTypes,
  CulturalSpaceAcessibilityType,
  CulturalSpaceEntranceType,
  CulturalSpaceEntryTypes,
  CulturalSpaceSphereTypes,
  EventFrequencyTypes,
  GenderTypes,
  RaceTypes,
  TaquaraNeighborhoods,
} from "./literals";

export type EventType = "Físico" | "Online" | "Híbrido";

export interface IPartnerCollection {
  partneName: string;
  partnerLogo: {
    imageURL: string;
    imageDescription: string;
  };
}

export interface ICulturalSpacePersonalInfo {
  privateEmail: string;
  publicEmail: string;
  culturalSpaceName: string;
  culturalSpaceHead: string;
  cpf_or_cpnj: string;
  culturalSpaceEntry: CulturalSpaceEntranceType;
  culturalSpaceSphere: CulturalSpaceSphereTypes;
  culturalSpaceCapacity: string;
  workingHours: string;
  entryTypes: CulturalSpaceEntryTypes;
  description: string;
  privatePhone: string;
  publicPhone?: string;
  publicPhoneAlt?: string;
  entryFee?: string;
}

export interface ICulturalSpaceAddressInfo {
  cep: string;
  street: string;
  neighborhood: TaquaraNeighborhoods;
  streetNumber: string;
  complement?: string;
}

export interface ICulturalSpaceCategories {
  category: CulturalCategoryTypes[];
  accessible: string;
  accessibilityType: CulturalSpaceAcessibilityType[];
}

export interface ICulturalSpaceSocials {
  website?: string;
  facebook?: string;
  instagram?: string;
}

export type ICulturalSpaceModel = ICulturalSpacePersonalInfo &
  ICulturalSpaceAddressInfo &
  ICulturalSpaceCategories &
  ICulturalSpaceSocials;

export interface IAgentPersonalInfo {
  registrationEmail: string;
  publicEmail: string;
  fullName: string;
  publicName: string;
  birthday_or_founding: string;
  cpf_or_cnpj: string;
  gender: GenderTypes;
  race: RaceTypes;
  professionalRecord: string;
  description: string;
  phoneNumber: string;
  publicPhoneNumber?: string;
}

export interface IAgentAddressInfo {
  cep: string;
  street: string;
  neighborhood: TaquaraNeighborhoods;
  streetNumber: string;
  complement?: string;
}

export interface IAgentSocialInfo {
  website?: string;
  facebook?: string;
  instagram?: string;
  portfolio?: string;
}

export interface IAgentCategories {
  categories: CulturalCategoryTypes[];
}

export type IAgentModel = IAgentPersonalInfo &
  IAgentAddressInfo &
  IAgentSocialInfo &
  IAgentCategories;

export interface IEventPersonalInfo {
  privateEmail: string;
  publicEmail?: string;
  eventName: string;
  eventHead: string;
  workingHours: string;
  startingDate: string;
  endingDate: string;
  eventAgeRestriction: AgeRestrictionTypes;
  eventFrequency: EventFrequencyTypes;
  description: string;
  eventEntryType: CulturalSpaceEntryTypes;
  eventFee?: string;
  privatePhone: string;
  publicPhone?: string;
}

export interface IEventCategories {
  categories: CulturalCategoryTypes[];
}

export interface IEventAddressInfo {
  eventType: "Físico" | "Online" | "Híbrido";
  cep?: string;
  street?: string;
  neighborhood?: TaquaraNeighborhoods;
  streetNumber?: string;
  complement?: string;
}

export interface IEventSocialsInfo {
  website?: string;
  eventURL?: string;
}

export type IEventModel = IEventPersonalInfo &
  IEventCategories &
  IEventAddressInfo &
  IEventSocialsInfo;

export interface IAgentModelAPIData extends IAgentModel {
  lat: string;
  long: string;
  status: any;
}

export interface IEventModelAPIData extends IEventModel {
  lat: string;
  long: string;
  status: any;
}

export interface ICulturalSpaceAPIData extends ICulturalSpaceModel {
  lat: string;
  long: string;
  status: any;
}
