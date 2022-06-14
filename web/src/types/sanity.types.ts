export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type About = Document & {
  __typename?: 'About';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  firstParagraph: Maybe<Array<Maybe<AboutFirstParagraphVariant>>>;
  paragraphs: Maybe<Array<Maybe<AboutParagraph>>>;
};

export type AboutFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
};

export type AboutFirstParagraphVariant = {
  __typename?: 'AboutFirstParagraphVariant';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  firstArtistHref: Maybe<Scalars['String']>;
  firstArtistName: Maybe<Scalars['String']>;
  secondArtistHref: Maybe<Scalars['String']>;
  secondArtistName: Maybe<Scalars['String']>;
};

export type AboutFirstParagraphVariantFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  firstArtistHref: InputMaybe<StringFilter>;
  firstArtistName: InputMaybe<StringFilter>;
  secondArtistHref: InputMaybe<StringFilter>;
  secondArtistName: InputMaybe<StringFilter>;
};

export type AboutFirstParagraphVariantSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  firstArtistHref: InputMaybe<SortOrder>;
  firstArtistName: InputMaybe<SortOrder>;
  secondArtistHref: InputMaybe<SortOrder>;
  secondArtistName: InputMaybe<SortOrder>;
};

export type AboutParagraph = {
  __typename?: 'AboutParagraph';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  paragraphs: Maybe<Array<Maybe<AboutParagraphRichText>>>;
};

export type AboutParagraphFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
};

export type AboutParagraphRichText = {
  __typename?: 'AboutParagraphRichText';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  variantsRaw: Maybe<Scalars['JSON']>;
};

export type AboutParagraphRichTextFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
};

export type AboutParagraphRichTextSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type AboutParagraphSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type AboutSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
};

export type Block = {
  __typename?: 'Block';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  children: Maybe<Array<Maybe<Span>>>;
  list: Maybe<Scalars['String']>;
  style: Maybe<Scalars['String']>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Boolean']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Boolean']>;
};

export type Color = {
  __typename?: 'Color';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  alpha: Maybe<Scalars['Float']>;
  hex: Maybe<Scalars['String']>;
  hsl: Maybe<HslaColor>;
  hsv: Maybe<HsvaColor>;
  rgb: Maybe<RgbaColor>;
};

export type ColorFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  alpha: InputMaybe<FloatFilter>;
  hex: InputMaybe<StringFilter>;
  hsl: InputMaybe<HslaColorFilter>;
  hsv: InputMaybe<HsvaColorFilter>;
  rgb: InputMaybe<RgbaColorFilter>;
};

export type ColorSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  alpha: InputMaybe<SortOrder>;
  hex: InputMaybe<SortOrder>;
  hsl: InputMaybe<HslaColorSorting>;
  hsv: InputMaybe<HsvaColorSorting>;
  rgb: InputMaybe<RgbaColorSorting>;
};

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Date']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Date']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Date']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Date']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Date']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Date']>;
};

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['DateTime']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['DateTime']>;
};

/** A Sanity document */
export type Document = {
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
};

export type DocumentFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
};

export type DocumentSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
};

export type File = {
  __typename?: 'File';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<SanityFileAsset>;
};

export type FileFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  asset: InputMaybe<SanityFileAssetFilter>;
};

export type FileSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Float']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Float']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Float']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Float']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Float']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Float']>;
};

export type Geopoint = {
  __typename?: 'Geopoint';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  alt: Maybe<Scalars['Float']>;
  lat: Maybe<Scalars['Float']>;
  lng: Maybe<Scalars['Float']>;
};

export type GeopointFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  alt: InputMaybe<FloatFilter>;
  lat: InputMaybe<FloatFilter>;
  lng: InputMaybe<FloatFilter>;
};

export type GeopointSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  alt: InputMaybe<SortOrder>;
  lat: InputMaybe<SortOrder>;
  lng: InputMaybe<SortOrder>;
};

export type HslaColor = {
  __typename?: 'HslaColor';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  a: Maybe<Scalars['Float']>;
  h: Maybe<Scalars['Float']>;
  l: Maybe<Scalars['Float']>;
  s: Maybe<Scalars['Float']>;
};

export type HslaColorFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  a: InputMaybe<FloatFilter>;
  h: InputMaybe<FloatFilter>;
  l: InputMaybe<FloatFilter>;
  s: InputMaybe<FloatFilter>;
};

export type HslaColorSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  a: InputMaybe<SortOrder>;
  h: InputMaybe<SortOrder>;
  l: InputMaybe<SortOrder>;
  s: InputMaybe<SortOrder>;
};

export type HsvaColor = {
  __typename?: 'HsvaColor';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  a: Maybe<Scalars['Float']>;
  h: Maybe<Scalars['Float']>;
  s: Maybe<Scalars['Float']>;
  v: Maybe<Scalars['Float']>;
};

export type HsvaColorFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  a: InputMaybe<FloatFilter>;
  h: InputMaybe<FloatFilter>;
  s: InputMaybe<FloatFilter>;
  v: InputMaybe<FloatFilter>;
};

export type HsvaColorSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  a: InputMaybe<SortOrder>;
  h: InputMaybe<SortOrder>;
  s: InputMaybe<SortOrder>;
  v: InputMaybe<SortOrder>;
};

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['ID']>;
  in: InputMaybe<Array<Scalars['ID']>>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['ID']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['ID']>;
  nin: InputMaybe<Array<Scalars['ID']>>;
};

export type Image = {
  __typename?: 'Image';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  asset: Maybe<SanityImageAsset>;
  crop: Maybe<SanityImageCrop>;
  hotspot: Maybe<SanityImageHotspot>;
};

export type ImageFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  asset: InputMaybe<SanityImageAssetFilter>;
  crop: InputMaybe<SanityImageCropFilter>;
  hotspot: InputMaybe<SanityImageHotspotFilter>;
};

export type ImageSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  crop: InputMaybe<SanityImageCropSorting>;
  hotspot: InputMaybe<SanityImageHotspotSorting>;
};

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['Int']>;
  /** Checks if the value is greater than the given input. */
  gt: InputMaybe<Scalars['Int']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte: InputMaybe<Scalars['Int']>;
  /** Checks if the value is lesser than the given input. */
  lt: InputMaybe<Scalars['Int']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte: InputMaybe<Scalars['Int']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['Int']>;
};

export type Media = {
  __typename?: 'Media';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  image: Maybe<MediaImage>;
  kind: Maybe<Scalars['String']>;
  video: Maybe<MediaVideo>;
};

export type MediaFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  image: InputMaybe<MediaImageFilter>;
  kind: InputMaybe<StringFilter>;
  video: InputMaybe<MediaVideoFilter>;
};

export type MediaImage = {
  __typename?: 'MediaImage';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  /** An optional description. Used with assistive technologies and as SEO information. */
  alt: Maybe<Scalars['String']>;
  image: Maybe<Image>;
};

export type MediaImageFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  alt: InputMaybe<StringFilter>;
  image: InputMaybe<ImageFilter>;
};

export type MediaImageSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  alt: InputMaybe<SortOrder>;
  image: InputMaybe<ImageSorting>;
};

export type MediaOrProjectBlockMediaOrProjectBlockRichText = Media | ProjectBlockMedia | ProjectBlockRichText;

export type MediaSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  image: InputMaybe<MediaImageSorting>;
  kind: InputMaybe<SortOrder>;
  video: InputMaybe<MediaVideoSorting>;
};

export type MediaVideo = {
  __typename?: 'MediaVideo';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  /** An optional description. Used with assistive technologies and as SEO information. */
  alt: Maybe<Scalars['String']>;
  height: Maybe<Scalars['Float']>;
  mp4: Maybe<File>;
  width: Maybe<Scalars['Float']>;
};

export type MediaVideoFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  alt: InputMaybe<StringFilter>;
  height: InputMaybe<FloatFilter>;
  mp4: InputMaybe<FileFilter>;
  width: InputMaybe<FloatFilter>;
};

export type MediaVideoSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  alt: InputMaybe<SortOrder>;
  height: InputMaybe<SortOrder>;
  mp4: InputMaybe<FileSorting>;
  width: InputMaybe<SortOrder>;
};

export type Project = Document & {
  __typename?: 'Project';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  awards: Maybe<Array<Maybe<ProjectAward>>>;
  blocks: Maybe<Array<Maybe<MediaOrProjectBlockMediaOrProjectBlockRichText>>>;
  clientRaw: Maybe<Scalars['JSON']>;
  descriptionRaw: Maybe<Scalars['JSON']>;
  location: Maybe<Scalars['String']>;
  openGraphImage: Maybe<Image>;
  roles: Maybe<Array<Maybe<ProjectRole>>>;
  slug: Maybe<Slug>;
  thumbnail: Maybe<ProjectThumbnail>;
  title: Maybe<Scalars['String']>;
  year: Maybe<Scalars['Float']>;
};

export type ProjectAward = {
  __typename?: 'ProjectAward';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  showBadge: Maybe<Scalars['Boolean']>;
  textRaw: Maybe<Scalars['JSON']>;
  year: Maybe<Scalars['Float']>;
};

export type ProjectAwardFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  showBadge: InputMaybe<BooleanFilter>;
  year: InputMaybe<FloatFilter>;
};

export type ProjectAwardSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  showBadge: InputMaybe<SortOrder>;
  year: InputMaybe<SortOrder>;
};

export type ProjectBlockMedia = {
  __typename?: 'ProjectBlockMedia';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  mediaBlockBlocks: Maybe<Array<Maybe<Media>>>;
};

export type ProjectBlockMediaFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
};

export type ProjectBlockMediaSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type ProjectBlockRichText = {
  __typename?: 'ProjectBlockRichText';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  textRaw: Maybe<Scalars['JSON']>;
};

export type ProjectBlockRichTextFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
};

export type ProjectBlockRichTextSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type ProjectFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  location: InputMaybe<StringFilter>;
  openGraphImage: InputMaybe<ImageFilter>;
  slug: InputMaybe<SlugFilter>;
  thumbnail: InputMaybe<ProjectThumbnailFilter>;
  title: InputMaybe<StringFilter>;
  year: InputMaybe<FloatFilter>;
};

export type ProjectRole = {
  __typename?: 'ProjectRole';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  /** i.e. "Responsible of" */
  pretitle: Maybe<Scalars['String']>;
  /** i.e. "Web prototyping" */
  title: Maybe<Scalars['String']>;
};

export type ProjectRoleFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  pretitle: InputMaybe<StringFilter>;
  title: InputMaybe<StringFilter>;
};

export type ProjectRoleSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  pretitle: InputMaybe<SortOrder>;
  title: InputMaybe<SortOrder>;
};

export type ProjectSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  location: InputMaybe<SortOrder>;
  openGraphImage: InputMaybe<ImageSorting>;
  slug: InputMaybe<SlugSorting>;
  thumbnail: InputMaybe<ProjectThumbnailSorting>;
  title: InputMaybe<SortOrder>;
  year: InputMaybe<SortOrder>;
};

export type ProjectThumbnail = {
  __typename?: 'ProjectThumbnail';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  color: Maybe<Color>;
  image: Maybe<MediaImage>;
  kind: Maybe<Scalars['String']>;
  video: Maybe<MediaVideo>;
};

export type ProjectThumbnailFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  color: InputMaybe<ColorFilter>;
  image: InputMaybe<MediaImageFilter>;
  kind: InputMaybe<StringFilter>;
  video: InputMaybe<MediaVideoFilter>;
};

export type ProjectThumbnailSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  color: InputMaybe<ColorSorting>;
  image: InputMaybe<MediaImageSorting>;
  kind: InputMaybe<SortOrder>;
  video: InputMaybe<MediaVideoSorting>;
};

export type RgbaColor = {
  __typename?: 'RgbaColor';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  a: Maybe<Scalars['Float']>;
  b: Maybe<Scalars['Float']>;
  g: Maybe<Scalars['Float']>;
  r: Maybe<Scalars['Float']>;
};

export type RgbaColorFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  a: InputMaybe<FloatFilter>;
  b: InputMaybe<FloatFilter>;
  g: InputMaybe<FloatFilter>;
  r: InputMaybe<FloatFilter>;
};

export type RgbaColorSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  a: InputMaybe<SortOrder>;
  b: InputMaybe<SortOrder>;
  g: InputMaybe<SortOrder>;
  r: InputMaybe<SortOrder>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  About: Maybe<About>;
  Document: Maybe<Document>;
  Project: Maybe<Project>;
  SanityFileAsset: Maybe<SanityFileAsset>;
  SanityImageAsset: Maybe<SanityImageAsset>;
  Settings: Maybe<Settings>;
  allAbout: Array<About>;
  allDocument: Array<Document>;
  allProject: Array<Project>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allSanityImageAsset: Array<SanityImageAsset>;
  allSettings: Array<Settings>;
};


export type RootQueryAboutArgs = {
  id: Scalars['ID'];
};


export type RootQueryDocumentArgs = {
  id: Scalars['ID'];
};


export type RootQueryProjectArgs = {
  id: Scalars['ID'];
};


export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID'];
};


export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID'];
};


export type RootQuerySettingsArgs = {
  id: Scalars['ID'];
};


export type RootQueryAllAboutArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<AboutSorting>>;
  where: InputMaybe<AboutFilter>;
};


export type RootQueryAllDocumentArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<DocumentSorting>>;
  where: InputMaybe<DocumentFilter>;
};


export type RootQueryAllProjectArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<ProjectSorting>>;
  where: InputMaybe<ProjectFilter>;
};


export type RootQueryAllSanityFileAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<SanityFileAssetSorting>>;
  where: InputMaybe<SanityFileAssetFilter>;
};


export type RootQueryAllSanityImageAssetArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<SanityImageAssetSorting>>;
  where: InputMaybe<SanityImageAssetFilter>;
};


export type RootQueryAllSettingsArgs = {
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  sort: InputMaybe<Array<SettingsSorting>>;
  where: InputMaybe<SettingsFilter>;
};

export type SanityAssetSourceData = {
  __typename?: 'SanityAssetSourceData';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id: Maybe<Scalars['String']>;
  /** A canonical name for the source this asset is originating from */
  name: Maybe<Scalars['String']>;
  /** A URL to find more information about this asset in the originating source */
  url: Maybe<Scalars['String']>;
};

export type SanityAssetSourceDataFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  id: InputMaybe<StringFilter>;
  name: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type SanityAssetSourceDataSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  id: InputMaybe<SortOrder>;
  name: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type SanityFileAsset = Document & {
  __typename?: 'SanityFileAsset';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  altText: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  extension: Maybe<Scalars['String']>;
  label: Maybe<Scalars['String']>;
  mimeType: Maybe<Scalars['String']>;
  originalFilename: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  sha1hash: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Float']>;
  source: Maybe<SanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  altText: InputMaybe<StringFilter>;
  assetId: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  extension: InputMaybe<StringFilter>;
  label: InputMaybe<StringFilter>;
  mimeType: InputMaybe<StringFilter>;
  originalFilename: InputMaybe<StringFilter>;
  path: InputMaybe<StringFilter>;
  sha1hash: InputMaybe<StringFilter>;
  size: InputMaybe<FloatFilter>;
  source: InputMaybe<SanityAssetSourceDataFilter>;
  title: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type SanityFileAssetSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  altText: InputMaybe<SortOrder>;
  assetId: InputMaybe<SortOrder>;
  description: InputMaybe<SortOrder>;
  extension: InputMaybe<SortOrder>;
  label: InputMaybe<SortOrder>;
  mimeType: InputMaybe<SortOrder>;
  originalFilename: InputMaybe<SortOrder>;
  path: InputMaybe<SortOrder>;
  sha1hash: InputMaybe<SortOrder>;
  size: InputMaybe<SortOrder>;
  source: InputMaybe<SanityAssetSourceDataSorting>;
  title: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type SanityImageAsset = Document & {
  __typename?: 'SanityImageAsset';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  altText: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  extension: Maybe<Scalars['String']>;
  label: Maybe<Scalars['String']>;
  metadata: Maybe<SanityImageMetadata>;
  mimeType: Maybe<Scalars['String']>;
  originalFilename: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  sha1hash: Maybe<Scalars['String']>;
  size: Maybe<Scalars['Float']>;
  source: Maybe<SanityAssetSourceData>;
  title: Maybe<Scalars['String']>;
  uploadId: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  altText: InputMaybe<StringFilter>;
  assetId: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  extension: InputMaybe<StringFilter>;
  label: InputMaybe<StringFilter>;
  metadata: InputMaybe<SanityImageMetadataFilter>;
  mimeType: InputMaybe<StringFilter>;
  originalFilename: InputMaybe<StringFilter>;
  path: InputMaybe<StringFilter>;
  sha1hash: InputMaybe<StringFilter>;
  size: InputMaybe<FloatFilter>;
  source: InputMaybe<SanityAssetSourceDataFilter>;
  title: InputMaybe<StringFilter>;
  uploadId: InputMaybe<StringFilter>;
  url: InputMaybe<StringFilter>;
};

export type SanityImageAssetSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  altText: InputMaybe<SortOrder>;
  assetId: InputMaybe<SortOrder>;
  description: InputMaybe<SortOrder>;
  extension: InputMaybe<SortOrder>;
  label: InputMaybe<SortOrder>;
  metadata: InputMaybe<SanityImageMetadataSorting>;
  mimeType: InputMaybe<SortOrder>;
  originalFilename: InputMaybe<SortOrder>;
  path: InputMaybe<SortOrder>;
  sha1hash: InputMaybe<SortOrder>;
  size: InputMaybe<SortOrder>;
  source: InputMaybe<SanityAssetSourceDataSorting>;
  title: InputMaybe<SortOrder>;
  uploadId: InputMaybe<SortOrder>;
  url: InputMaybe<SortOrder>;
};

export type SanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  bottom: Maybe<Scalars['Float']>;
  left: Maybe<Scalars['Float']>;
  right: Maybe<Scalars['Float']>;
  top: Maybe<Scalars['Float']>;
};

export type SanityImageCropFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  bottom: InputMaybe<FloatFilter>;
  left: InputMaybe<FloatFilter>;
  right: InputMaybe<FloatFilter>;
  top: InputMaybe<FloatFilter>;
};

export type SanityImageCropSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  bottom: InputMaybe<SortOrder>;
  left: InputMaybe<SortOrder>;
  right: InputMaybe<SortOrder>;
  top: InputMaybe<SortOrder>;
};

export type SanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
};

export type SanityImageDimensionsFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  aspectRatio: InputMaybe<FloatFilter>;
  height: InputMaybe<FloatFilter>;
  width: InputMaybe<FloatFilter>;
};

export type SanityImageDimensionsSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  aspectRatio: InputMaybe<SortOrder>;
  height: InputMaybe<SortOrder>;
  width: InputMaybe<SortOrder>;
};

export type SanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
  x: Maybe<Scalars['Float']>;
  y: Maybe<Scalars['Float']>;
};

export type SanityImageHotspotFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  height: InputMaybe<FloatFilter>;
  width: InputMaybe<FloatFilter>;
  x: InputMaybe<FloatFilter>;
  y: InputMaybe<FloatFilter>;
};

export type SanityImageHotspotSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  height: InputMaybe<SortOrder>;
  width: InputMaybe<SortOrder>;
  x: InputMaybe<SortOrder>;
  y: InputMaybe<SortOrder>;
};

export type SanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  blurHash: Maybe<Scalars['String']>;
  dimensions: Maybe<SanityImageDimensions>;
  hasAlpha: Maybe<Scalars['Boolean']>;
  isOpaque: Maybe<Scalars['Boolean']>;
  location: Maybe<Geopoint>;
  lqip: Maybe<Scalars['String']>;
  palette: Maybe<SanityImagePalette>;
};

export type SanityImageMetadataFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  blurHash: InputMaybe<StringFilter>;
  dimensions: InputMaybe<SanityImageDimensionsFilter>;
  hasAlpha: InputMaybe<BooleanFilter>;
  isOpaque: InputMaybe<BooleanFilter>;
  location: InputMaybe<GeopointFilter>;
  lqip: InputMaybe<StringFilter>;
  palette: InputMaybe<SanityImagePaletteFilter>;
};

export type SanityImageMetadataSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  blurHash: InputMaybe<SortOrder>;
  dimensions: InputMaybe<SanityImageDimensionsSorting>;
  hasAlpha: InputMaybe<SortOrder>;
  isOpaque: InputMaybe<SortOrder>;
  location: InputMaybe<GeopointSorting>;
  lqip: InputMaybe<SortOrder>;
  palette: InputMaybe<SanityImagePaletteSorting>;
};

export type SanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  darkMuted: Maybe<SanityImagePaletteSwatch>;
  darkVibrant: Maybe<SanityImagePaletteSwatch>;
  dominant: Maybe<SanityImagePaletteSwatch>;
  lightMuted: Maybe<SanityImagePaletteSwatch>;
  lightVibrant: Maybe<SanityImagePaletteSwatch>;
  muted: Maybe<SanityImagePaletteSwatch>;
  vibrant: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  darkMuted: InputMaybe<SanityImagePaletteSwatchFilter>;
  darkVibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
  dominant: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightMuted: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightVibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
  muted: InputMaybe<SanityImagePaletteSwatchFilter>;
  vibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
};

export type SanityImagePaletteSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  darkMuted: InputMaybe<SanityImagePaletteSwatchSorting>;
  darkVibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
  dominant: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightMuted: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightVibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
  muted: InputMaybe<SanityImagePaletteSwatchSorting>;
  vibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
};

export type SanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
  foreground: Maybe<Scalars['String']>;
  population: Maybe<Scalars['Float']>;
  title: Maybe<Scalars['String']>;
};

export type SanityImagePaletteSwatchFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  background: InputMaybe<StringFilter>;
  foreground: InputMaybe<StringFilter>;
  population: InputMaybe<FloatFilter>;
  title: InputMaybe<StringFilter>;
};

export type SanityImagePaletteSwatchSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  background: InputMaybe<SortOrder>;
  foreground: InputMaybe<SortOrder>;
  population: InputMaybe<SortOrder>;
  title: InputMaybe<SortOrder>;
};

export type Sanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft: InputMaybe<Scalars['Boolean']>;
  /** All documents referencing the given document ID. */
  references: InputMaybe<Scalars['ID']>;
};

export type Settings = Document & {
  __typename?: 'Settings';
  /** Date the document was created */
  _createdAt: Maybe<Scalars['DateTime']>;
  /** Document ID */
  _id: Maybe<Scalars['ID']>;
  _key: Maybe<Scalars['String']>;
  /** Current document revision */
  _rev: Maybe<Scalars['String']>;
  /** Document type */
  _type: Maybe<Scalars['String']>;
  /** Date the document was last modified */
  _updatedAt: Maybe<Scalars['DateTime']>;
  catchphrases: Maybe<Array<Maybe<SettingsCatchphrase>>>;
  colors: Maybe<Array<Maybe<SettingsThemeColor>>>;
  literals: Maybe<Array<Maybe<SettingsLiteral>>>;
  slidingTexts: Maybe<Array<Maybe<Scalars['String']>>>;
  slidingTextsError: Maybe<Array<Maybe<Scalars['String']>>>;
  toys: Maybe<SettingsToys>;
  typefaces: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SettingsCatchphrase = {
  __typename?: 'SettingsCatchphrase';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  textRaw: Maybe<Scalars['JSON']>;
  visibility: Maybe<Scalars['String']>;
};

export type SettingsCatchphraseFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  visibility: InputMaybe<StringFilter>;
};

export type SettingsCatchphraseSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  visibility: InputMaybe<SortOrder>;
};

export type SettingsFilter = {
  /** Apply filters on document level */
  _: InputMaybe<Sanity_DocumentFilter>;
  _createdAt: InputMaybe<DatetimeFilter>;
  _id: InputMaybe<IdFilter>;
  _key: InputMaybe<StringFilter>;
  _rev: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  _updatedAt: InputMaybe<DatetimeFilter>;
  toys: InputMaybe<SettingsToysFilter>;
};

export type SettingsLiteral = {
  __typename?: 'SettingsLiteral';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  /** Use camelCase please 🙏 */
  key: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

export type SettingsLiteralFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  key: InputMaybe<StringFilter>;
  value: InputMaybe<StringFilter>;
};

export type SettingsLiteralSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  key: InputMaybe<SortOrder>;
  value: InputMaybe<SortOrder>;
};

export type SettingsSorting = {
  _createdAt: InputMaybe<SortOrder>;
  _id: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _rev: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  _updatedAt: InputMaybe<SortOrder>;
  toys: InputMaybe<SettingsToysSorting>;
};

export type SettingsThemeColor = {
  __typename?: 'SettingsThemeColor';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  background: Maybe<Color>;
  card: Maybe<Color>;
  text: Maybe<Color>;
};

export type SettingsThemeColorFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  background: InputMaybe<ColorFilter>;
  card: InputMaybe<ColorFilter>;
  text: InputMaybe<ColorFilter>;
};

export type SettingsThemeColorSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  background: InputMaybe<ColorSorting>;
  card: InputMaybe<ColorSorting>;
  text: InputMaybe<ColorSorting>;
};

export type SettingsToys = {
  __typename?: 'SettingsToys';
  TOY_2D_PHYSICAL_SHAPES: Maybe<Scalars['Boolean']>;
  TOY_STICKERS: Maybe<Scalars['Boolean']>;
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
};

export type SettingsToysFilter = {
  TOY_2D_PHYSICAL_SHAPES: InputMaybe<BooleanFilter>;
  TOY_STICKERS: InputMaybe<BooleanFilter>;
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
};

export type SettingsToysSorting = {
  TOY_2D_PHYSICAL_SHAPES: InputMaybe<SortOrder>;
  TOY_STICKERS: InputMaybe<SortOrder>;
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
};

export type Slug = {
  __typename?: 'Slug';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  current: Maybe<Scalars['String']>;
};

export type SlugFilter = {
  _key: InputMaybe<StringFilter>;
  _type: InputMaybe<StringFilter>;
  current: InputMaybe<StringFilter>;
};

export type SlugSorting = {
  _key: InputMaybe<SortOrder>;
  _type: InputMaybe<SortOrder>;
  current: InputMaybe<SortOrder>;
};

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC'
}

export type Span = {
  __typename?: 'Span';
  _key: Maybe<Scalars['String']>;
  _type: Maybe<Scalars['String']>;
  marks: Maybe<Array<Maybe<Scalars['String']>>>;
  text: Maybe<Scalars['String']>;
};

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<Scalars['String']>>;
  /** Checks if the value matches the given word/words. */
  matches: InputMaybe<Scalars['String']>;
  /** Checks if the value is not equal to the given input. */
  neq: InputMaybe<Scalars['String']>;
  nin: InputMaybe<Array<Scalars['String']>>;
};

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = { __typename?: 'RootQuery', allSettings: Array<{ __typename?: 'Settings', _id: string, slidingTexts: Array<string>, typefaces: Array<string>, literals: Array<{ __typename?: 'SettingsLiteral', key: string, value: string }>, toys: { __typename?: 'SettingsToys', TOY_STICKERS: boolean, TOY_2D_PHYSICAL_SHAPES: boolean }, catchphrases: Array<{ __typename?: 'SettingsCatchphrase', textRaw: any, visibility: string }>, colors: Array<{ __typename?: 'SettingsThemeColor', background: { __typename?: 'Color', hex: string }, text: { __typename?: 'Color', hex: string }, card: { __typename?: 'Color', hex: string } }> }> };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', _id: string, title: string, slug: { __typename?: 'Slug', current: string }, awards: Array<{ __typename?: 'ProjectAward', showBadge: boolean }>, thumbnail: { __typename?: 'ProjectThumbnail', kind: string, color: { __typename?: 'Color', hex: string }, video: { __typename?: 'MediaVideo', width: number, height: number, alt: string, mp4: { __typename?: 'File', asset: { __typename?: 'SanityFileAsset', url: string } } }, image: { __typename?: 'MediaImage', alt: string, image: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string, metadata: { __typename?: 'SanityImageMetadata', dimensions: { __typename?: 'SanityImageDimensions', height: number, width: number } } } } } } }> };

export type GetProjectQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetProjectQuery = { __typename?: 'RootQuery', allProject: Array<{ __typename?: 'Project', _id: string, title: string, descriptionRaw: any, clientRaw: any, location: string, year: number, openGraphImage: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string, metadata: { __typename?: 'SanityImageMetadata', dimensions: { __typename?: 'SanityImageDimensions', height: number, width: number } } } }, thumbnail: { __typename?: 'ProjectThumbnail', kind: string, color: { __typename?: 'Color', hex: string }, video: { __typename?: 'MediaVideo', width: number, height: number, alt: string, mp4: { __typename?: 'File', asset: { __typename?: 'SanityFileAsset', url: string } } }, image: { __typename?: 'MediaImage', alt: string, image: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string, metadata: { __typename?: 'SanityImageMetadata', dimensions: { __typename?: 'SanityImageDimensions', height: number, width: number } } } } } }, blocks: Array<{ __typename: 'Media', _key: string, kind: string, video: { __typename?: 'MediaVideo', width: number, height: number, alt: string, mp4: { __typename?: 'File', asset: { __typename?: 'SanityFileAsset', url: string } } }, image: { __typename?: 'MediaImage', alt: string, image: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string, metadata: { __typename?: 'SanityImageMetadata', dimensions: { __typename?: 'SanityImageDimensions', height: number, width: number } } } } } } | { __typename: 'ProjectBlockMedia', _key: string, mediaBlockBlocks: Array<{ __typename?: 'Media', kind: string, video: { __typename?: 'MediaVideo', width: number, height: number, alt: string, mp4: { __typename?: 'File', asset: { __typename?: 'SanityFileAsset', url: string } } }, image: { __typename?: 'MediaImage', alt: string, image: { __typename?: 'Image', asset: { __typename?: 'SanityImageAsset', url: string, metadata: { __typename?: 'SanityImageMetadata', dimensions: { __typename?: 'SanityImageDimensions', height: number, width: number } } } } } }> } | { __typename: 'ProjectBlockRichText', _key: string, textRaw: any }>, roles: Array<{ __typename?: 'ProjectRole', _key: string, pretitle: string, title: string }>, awards: Array<{ __typename?: 'ProjectAward', _key: string, textRaw: any, year: number }> }> };

export type GetAboutQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAboutQuery = { __typename?: 'RootQuery', allAbout: Array<{ __typename?: 'About', _id: string, firstParagraph: Array<{ __typename?: 'AboutFirstParagraphVariant', firstArtistName: string, firstArtistHref: string, secondArtistName: string, secondArtistHref: string }>, paragraphs: Array<{ __typename?: 'AboutParagraph', _key: string, paragraphs: Array<{ __typename?: 'AboutParagraphRichText', variantsRaw: any }> }> }> };
