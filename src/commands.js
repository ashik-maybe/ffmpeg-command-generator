import { resolutions } from './operations.js';

function parseTime(input) {
  if (!input || input === '') return '';
  const trimmed = input.trim();
  if (/^\d+$/.test(trimmed)) return trimmed;
  if (/^\d+\.\d+$/.test(trimmed)) return trimmed;
  const parts = trimmed.split(':').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    const [h, m, s] = parts;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    const [m, s] = parts;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return trimmed;
}

function getBaseName(input) {
  if (!input) return 'output';
  const lastDot = input.lastIndexOf('.');
  return lastDot > 0 ? input.substring(0, lastDot) : input;
}

function buildConvert(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  
  const startTime = parseTime(data.startTime);
  if (startTime) cmd += ` -ss ${startTime}`;
  
  cmd += ` -i "${data.input}"`;
  
  if (data.videoCodec && data.videoCodec !== 'auto') {
    cmd += ` -c:v ${data.videoCodec}`;
  }
  if (data.audioCodec && data.audioCodec !== 'auto') {
    cmd += ` -c:a ${data.audioCodec}`;
  }
  
  const output = getBaseName(data.input) + '.' + (data.format || 'mp4');
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildAudio(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -i "${data.input}"`;
  
  const filters = [];
  if (data.volume && data.volume !== 1) {
    filters.push(`volume=${data.volume}`);
  }
  
  if (data.extractAudio) {
    cmd += ' -vn';
  }
  
  if (data.audioCodec && data.audioCodec !== 'auto') {
    cmd += ` -c:a ${data.audioCodec}`;
  } else if (data.audioFormat) {
    const codecMap = { mp3: 'libmp3lame', aac: 'aac', wav: 'pcm_s16le', flac: 'flac', ogg: 'libvorbis', m4a: 'aac' };
    cmd += ` -c:a ${codecMap[data.audioFormat] || 'aac'}`;
  }
  
  if (data.bitrate) cmd += ` -b:a ${data.bitrate}`;
  if (data.sampleRate) cmd += ` -ar ${data.sampleRate}`;
  
  if (data.channels && data.channels !== 'keep') {
    cmd += ` -ac ${data.channels === 'mono' ? 1 : 2}`;
  }
  
  if (filters.length > 0) {
    cmd += ` -af "${filters.join(',')}"`;
  }
  
  const format = data.audioFormat || 'mp3';
  const output = getBaseName(data.input) + '.' + format;
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildTrim(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  
  const startTime = parseTime(data.startTime);
  if (startTime) cmd += ` -ss ${startTime}`;
  
  cmd += ` -i "${data.input}"`;
  
  if (data.duration) {
    cmd += ` -t ${data.duration}`;
  } else if (data.endTime) {
    const endTime = parseTime(data.endTime);
    if (endTime) cmd += ` -to ${endTime}`;
  }
  
  if (!data.keepOriginal) {
    if (data.videoCodec) cmd += ` -c:v libx264`;
    if (data.audioCodec) cmd += ` -c:a aac`;
  } else {
    cmd += ' -c copy';
  }
  
  const output = getBaseName(data.input) + '_trimmed.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildFilters(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -i "${data.input}"`;
  
  const videoFilters = [];
  
  if (data.scale) {
    videoFilters.push(`scale=${data.scale}`);
  }
  
  if (data.crop) {
    videoFilters.push(`crop=${data.crop}`);
  }
  
  if (data.rotate && data.rotate !== '0') {
    if (data.rotate === 'hflip') {
      videoFilters.push('hflip');
    } else if (data.rotate === 'vflip') {
      videoFilters.push('vflip');
    } else {
      const rotMap = { '90': 'transpose=1', '180': 'transpose=2,transpose=2', '270': 'transpose=2' };
      videoFilters.push(rotMap[data.rotate] || '');
    }
  }
  
  if (data.speed && data.speed !== 1) {
    videoFilters.push(`setpts=${1/data.speed}*PTS`);
    if (!data.disableAudioSpeed) {
      cmd += ` -af "atempo=${data.speed}"`;
    }
  }
  
  if (data.deinterlace) {
    videoFilters.push('yadif');
  }
  
  if (data.denoise && data.denoise !== 'none') {
    const denoiseMap = { light: 'hqdn3d=2:1:3:3', medium: 'hqdn3d=4:3:6:6', strong: 'hqdn3d=8:6:12:12' };
    videoFilters.push(denoiseMap[data.denoise]);
  }
  
  if (data.brightness && data.brightness !== 0) {
    videoFilters.push(`eq=brightness=${data.brightness}`);
  }
  
  if (data.contrast && data.contrast !== 1) {
    videoFilters.push(`eq=contrast=${data.contrast}`);
  }
  
  if (data.saturation && data.saturation !== 1) {
    videoFilters.push(`eq=saturation=${data.saturation}`);
  }
  
  if (videoFilters.length > 0) {
    cmd += ` -vf "${videoFilters.join(',')}"`;
  }
  
  const output = getBaseName(data.input) + '_filtered.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildEncode(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -i "${data.input}"`;
  
  cmd += ` -c:v ${data.videoCodec || 'libx264'}`;
  cmd += ` -c:a ${data.audioCodec || 'aac'}`;
  
  if (data.resolution && data.resolution !== 'original') {
    const res = resolutions[data.resolution];
    if (res) {
      cmd += ` -s ${res.w}x${res.h}`;
    }
  }
  
  if (data.bitrate) {
    cmd += ` -b:v ${data.bitrate}`;
    cmd += ` -maxrate ${data.bitrate}`;
    cmd += ` -bufsize ${data.bitrate}`;
  } else if (data.crf) {
    cmd += ` -crf ${data.crf}`;
  }
  
  if (data.preset) {
    cmd += ` -preset ${data.preset}`;
  }
  
  if (data.framerate && data.framerate !== 'original') {
    cmd += ` -r ${data.framerate}`;
  }
  
  if (data.pixFormat) {
    cmd += ` -pix_fmt ${data.pixFormat}`;
  }
  
  const output = getBaseName(data.input) + '_encoded.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildConcat(data) {
  if (!data.inputFiles) return '# Add input files to generate command';
  
  const files = data.inputFiles.split('\n').filter(f => f.trim());
  if (files.length < 2) return '# Need at least 2 files to concatenate';
  
  if (data.method === 'protocol') {
    let cmd = 'ffmpeg';
    if (data.overwrite) cmd += ' -y';
    cmd += ' -i "concat:';
    cmd += files.map(f => f.trim()).join('|');
    cmd += '"';
    
    if (data.videoCodec && data.videoCodec !== 'copy') {
      cmd += ` -c:v ${data.videoCodec}`;
    }
    if (data.audioCodec && data.audioCodec !== 'copy') {
      cmd += ` -c:a ${data.audioCodec}`;
    }
    
    const output = data.outputFile || 'output.mp4';
    cmd += ` "${output}"`;
    
    return cmd;
  }
  
  const listFile = 'concat_list.txt';
  let cmd = `# Create list file:\necho "${files.map(f => `file '${f.trim()}'`).join('\\n')}" > ${listFile}\n\n`;
  cmd += 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -f concat -safe 0 -i ${listFile}`;
  
  if (data.videoCodec && data.videoCodec !== 'copy') {
    cmd += ` -c:v ${data.videoCodec}`;
  }
  if (data.audioCodec && data.audioCodec !== 'copy') {
    cmd += ` -c:a ${data.audioCodec}`;
  }
  
  const output = data.outputFile || 'output.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildSubtitles(data) {
  if (!data.input) return '# Add an input video to generate command';
  if (!data.subtitleFile) return '# Add a subtitle file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -i "${data.input}"`;
  cmd += ` -i "${data.subtitleFile}"`;
  
  if (data.burnIn) {
    let vf = '';
    if (data.fontSize || data.fontColor || data.position) {
      const fontsize = data.fontSize || 24;
      const fontcolor = data.fontColor || 'white';
      const pos = data.position || 'bottom';
      const yPos = pos === 'bottom' ? 'h-text_h-10' : pos === 'top' ? '10' : '(h-text_h)/2';
      vf = `subtitles=${data.subtitleFile}:force_style='Fontsize=${fontsize},PrimaryColour=&H${fontcolor.replace('white','FFFFFF').replace('black','000000')},MarginV=${pos === 'bottom' ? 10 : 20}'`;
    } else {
      vf = `subtitles=${data.subtitleFile}`;
    }
    cmd += ` -vf "${vf}"`;
  } else {
    cmd += ` -c:s ${data.subCodec || 'mov_text'}`;
    cmd += ' -c copy';
  }
  
  const output = getBaseName(data.input) + '_subtitled.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildGIF(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  cmd += ` -i "${data.input}"`;
  
  const startTime = parseTime(data.startTime) || '0';
  cmd += ` -ss ${startTime}`;
  
  const duration = data.duration || 5;
  cmd += ` -t ${duration}`;
  
  const scale = data.height === -1 
    ? `${data.width}:-1` 
    : (data.width ? `${data.width}:${data.height || -2}` : '-1:-1');
  
  const fps = data.fps || 15;
  const colors = data.colors || 256;
  
  cmd += ` -vf "fps=${fps},scale=${scale}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=${colors}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5"`;
  
  const output = data.outputFile || 'output.gif';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildThumbnails(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  cmd += ` -i "${data.input}"`;
  
  const pattern = data.outputPattern || 'frame_%04d.jpg';
  const format = data.format || 'jpg';
  
  if (data.extractMode === 'single') {
    if (data.timestamp) {
      cmd += ` -ss ${parseTime(data.timestamp)}`;
    } else if (data.frameNumber) {
      const fps = 25;
      const time = (data.frameNumber - 1) / fps;
      cmd += ` -ss ${time}`;
    }
    const singlePattern = pattern.replace('%04d', '001');
    cmd += ` -vframes 1 "${singlePattern}"`;
    return cmd;
  }
  
  if (data.extractMode === 'interval') {
    cmd += ` -vf "fps=1/${data.interval || 1}"`;
  }
  
  if (data.totalFrames) {
    cmd += ` -vframes ${data.totalFrames}`;
  }
  
  if (format === 'png') {
    cmd += ' -c:v png';
  } else if (format === 'webp') {
    cmd += ' -c:v libwebp';
  } else {
    cmd += ' -q:v 2';
  }
  
  cmd += ` "${pattern}"`;
  
  return cmd;
}

function buildMerge(data) {
  if (!data.videoFile) return '# Add a video file to generate command';
  if (!data.audioFile) return '# Add an audio file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -i "${data.videoFile}"`;
  cmd += ` -i "${data.audioFile}"`;
  
  cmd += ` -c:v ${data.videoCodec || 'copy'}`;
  cmd += ` -c:a ${data.audioCodec || 'aac'}`;
  
  if (data.sync) {
    cmd += ' -map_metadata 0';
  }
  
  const output = data.outputFile || getBaseName(data.videoFile) + '_merged.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

function buildStream(data) {
  if (!data.input) return '# Add an input source to generate command';
  if (!data.streamUrl) return '# Add a stream URL to generate command';
  
  let cmd = 'ffmpeg';
  cmd += ` -re -i "${data.input}"`;
  
  cmd += ` -c:v ${data.videoCodec || 'libx264'}`;
  cmd += ` -c:a ${data.audioCodec || 'aac'}`;
  
  const bitrate = data.bitrate || '4500k';
  cmd += ` -b:v ${bitrate}`;
  cmd += ` -maxrate ${bitrate}`;
  cmd += ` -bufsize ${bitrate}`;
  
  if (data.preset) {
    cmd += ` -preset ${data.preset}`;
  }
  
  cmd += ' -f flv';
  
  let streamDest = data.streamUrl;
  if (data.streamKey) {
    streamDest += `/${data.streamKey}`;
  }
  
  cmd += ` "${streamDest}"`;
  
  return cmd;
}

function buildMetadata(data) {
  if (!data.input) return '# Add an input file to generate command';
  
  let cmd = 'ffmpeg';
  if (data.overwrite) cmd += ' -y';
  cmd += ` -i "${data.input}"`;
  
  if (data.action === 'clear') {
    cmd += ' -map_metadata - -c:v copy -c:a copy';
  } else if (data.action === 'set' || !data.action) {
    const meta = [];
    if (data.title) meta.push(`title=${data.title}`);
    if (data.artist) meta.push(`artist=${data.artist}`);
    if (data.album) meta.push(`album=${data.album}`);
    if (data.year) meta.push(`date=${data.year}`);
    if (data.comment) meta.push(`comment=${data.comment}`);
    
    if (meta.length > 0) {
      cmd += ` -metadata "${meta.join(',')}"`;
    }
    
    if (data.cover) {
      cmd += ` -i "${data.cover}" -map 0 -map 1 -c copy -disposition:v:0 attached_pic`;
    }
  } else {
    cmd += ' -c copy -map_metadata 0';
  }
  
  const output = data.outputFile || getBaseName(data.input) + '_metadata.mp4';
  cmd += ` "${output}"`;
  
  return cmd;
}

export function buildCommand(tab, formData) {
  const defaults = {
    overwrite: true,
    crf: 23,
    preset: 'medium',
    format: 'mp4',
    audioFormat: 'mp3',
    bitrate: '192k',
    sampleRate: '48000',
    channels: 'keep',
    volume: 1.0,
    keepOriginal: true,
    fps: 15,
    colors: 256,
    quality: 95
  };
  
  const data = { ...defaults, ...formData };
  
  const builders = {
    convert: buildConvert,
    audio: buildAudio,
    trim: buildTrim,
    filters: buildFilters,
    encode: buildEncode,
    concat: buildConcat,
    subtitles: buildSubtitles,
    gif: buildGIF,
    thumbnails: buildThumbnails,
    merge: buildMerge,
    stream: buildStream,
    metadata: buildMetadata
  };
  
  const builder = builders[tab];
  if (!builder) return '# Unknown operation';
  
  return builder(data);
}

export function getUsage(tab) {
  const usages = {
    convert: 'Convert video from one format to another. Use "copy" for instant conversion without re-encoding.',
    audio: 'Extract audio from video or convert audio format. Higher bitrate = better quality but larger file.',
    trim: 'Cut video at specific timestamps. Accepts seconds (10) or HH:MM:SS format. Stream copy is instant.',
    filters: 'Apply video filters. Use -1 in scale to auto-calculate dimension. Multiple filters chain together.',
    encode: 'CRF: 18=visually lossless, 23=default, 51=worst. Lower preset = faster but bigger file.',
    concat: 'Join multiple videos. Demuxer: all files must have same resolution/codec. Protocol: just concatenates bytes.',
    subtitles: 'Burned subtitles are permanently embedded. Soft subtitles allow users to toggle them.',
    gif: 'Create animated GIF. Lower fps and colors = smaller file. Use -1 for height to maintain aspect ratio.',
    thumbnails: 'Extract single frame or multiple frames. Use %04d for sequential numbering.',
    merge: 'Merge separate video and audio files. Use copy for instant merge without re-encoding.',
    stream: 'Stream to RTMP server. Requires running ffmpeg continuously.',
    metadata: 'Edit metadata tags. Some formats have limited tag support.'
  };
  
  return usages[tab] || '';
}
