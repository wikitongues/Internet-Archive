const Field = require('./field');
const {normalize} = require('./helpers');

const fileMapper = record => {
  const id = record.get('Identifier');
  return `./${id}/data/${id}__video_edited.mp4`
};

const dateMapper = record => {
  return record.get('Date Created') || record.get('Date Received') || '';
};

const coverageMapper = record => {
  const territory = record.get('Coverage: Video Territory');
  // e.g. New-York_US
  // IA coverage should be the ISO 3166 2-letter country code
  if (!territory) {
    return '';
  }
  const match = territory.match(/_([A-Z]{2})$/);
  if (match.length < 2) {
    return '';
  }
  return match[1];
};

const creatorMapper = record => {
  const creator = record.get('Creator');
  // e.g. Daniel_BogreUdell_20130101 => Daniel Bogre Udell
  // Can also be a list of id's
  if (!creator) {
    return '';
  }

  const formatter = individual => individual
    .split('_')
    .slice(0, -1)
    .join(' ')
    .replace(/([a-z])([A-Z])/g, (_, p1, p2) => `${p1} ${p2}`);

  return creator
    .split(', ')
    .map(formatter)
    .join(', ');
}

module.exports = [
  // reserved IA metadata fields
  new Field('Identifier', 'identifier', record => `${normalize(record.get('Identifier')).replace('+', '-')}`),
  new Field(null, 'file', fileMapper),
  new Field('Title', 'title'),
  new Field(null, 'creator', creatorMapper),
  new Field(null, 'date', dateMapper),
  new Field('Description', 'description'),
  new Field('Display Aspect Ratio', 'aspect_ratio'),
  new Field('Codec ID Audio', 'audio_codec'),
  new Field('Sampling rate', 'audio_sample_rate'),
  new Field(null, 'coverage', coverageMapper),
  new Field('Frame Rate', 'frames_per_second'),
  new Field('Language names', 'language'),
  new Field(null, 'mediatype', () => 'movies'),
  new Field(null, 'publisher', () => 'Wikitongues, Inc.'),
  new Field('Rights', 'rights'),
  new Field('Duration', 'runtime'),
  new Field('Height', 'source_pixel_height'),
  new Field('Width', 'source_pixel_width'),
  // Wikitongues fields
  new Field('Subject: Top level genealogy per language', 'subject_top_level_genealogy_per_language'),
  new Field('Subject: Language Continent of Origin', 'subject_language_continent_of_origin'),
  new Field('Subject: Language Nation of Origin', 'subject_language_nation_of_origin'),
  new Field('Subject: Speaker Genders', 'subject_speaker_genders'),
  new Field('Contributor: Speakers', 'contributor_speakers'),
  new Field('Contributor: Caption Authors', 'contributor_caption_authors'),
  new Field('Contributor: Videographer', 'contributor_videographer'),
  new Field('Contributor: Description', 'contributor_description'),
  new Field('Date Created', 'date_created'),
  new Field('Type', 'type'),
  new Field('Format', 'format'),
  new Field('Languages: Speaker preferred names', 'languages_speaker_preferred_names'),
  new Field('Languages: ISO Code (639-3)', 'languages_iso_code'),
  new Field('Languages: Glottocode', 'languages_glottocode'),
  new Field('Languages: Dialect Glottocode', 'languages_dialect_glottocode'),
  new Field('Languages: Macrolanguage ISO Code', 'languages_macrolanguage_iso_code'),
  new Field('Caption Languages', 'caption_languages'),
  new Field('Caption Languages: ISO Code (639-6)', 'caption_languages_iso_code'),
  new Field('Caption Languages: Glottocode', 'caption_languages_glottocode'),
  new Field('Caption File Identifier', 'caption_file_identifier'),
  new Field('Caption File Links', 'caption_file_links'),
  new Field('Coverage: Video Nation', 'coverage_video_nation'),
  new Field('Coverage: Video Territory', 'coverage_video_territory'),
  new Field('Coverage: Distribution', 'coverage_distribution'),
  new Field('Date Received', 'date_received'),
  new Field('Encoded Data', 'encoded_data'),
  new Field('Tagged Data', 'tagged_data'),
  new Field('Format T', 'format_t'),
  new Field('Format Profile', 'format_profile'),
  new Field('Codec ID', 'codec_id'),
  new Field('File size', 'file_size'),
  new Field('Format Info', 'format_info'),
  new Field('Format Settings', 'format_settings'),
  new Field('Format Settings CABAC', 'format_settings_cabac'),
  new Field('Format Settings ReFrames', 'format_settings_reframes'),
  new Field('Codec ID/Info', 'codec_id_info'),
  new Field('Bit rate', 'bit_rate'),
  new Field('Standard', 'standard'),
  new Field('Color Space', 'color_space'),
  new Field('Chroma Subsampling', 'chroma_subsampling'),
  new Field('Bit Depth', 'bit_depth'),
  new Field('Scan Type', 'scan_type'),
  new Field('Bits (Pixel*Frame)', 'bits'),
  new Field('Stream size', 'stream_size'),
  new Field('Color range', 'color_range'),
  new Field('Color primaries', 'color_primaries'),
  new Field('Transfer characteristics', 'transfer_characteristics'),
  new Field('Matrix coefficients', 'matrix_coefficients'),
  new Field('Codec configuration box', 'codec_configuration_box'),
  new Field('Format audio', 'format_audio'),
  new Field('Format/Info Audio', 'format_info_audio'),
  new Field('Bit Rate Audio', 'bit_rate_audio'),
  new Field('Bit rate mode audio', 'bit_rate_mode_audio'),
  new Field('Channel(s)', 'channels'),
  new Field('Channel layout', 'channel_layout'),
  new Field('Compression mode', 'compression_mode'),
  new Field('Stream size audio', 'stream_size_audio'),
  new Field('Subjects Reference ID: Ethnologue', 'subject_reference_id_ethnologue')
];
