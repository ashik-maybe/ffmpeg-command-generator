export const operations = {
  convert: {
    name: 'Convert',
    description: 'Convert between video formats',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'format', label: 'Output Format', type: 'select', options: ['mp4', 'mkv', 'webm', 'avi', 'mov', 'flv', 'wmv'], default: 'mp4' },
      { id: 'videoCodec', label: 'Video Codec', type: 'select', options: ['auto', 'copy', 'libx264', 'libx265', 'libvpx-vp9', 'libaom-av1'], default: 'auto' },
      { id: 'audioCodec', label: 'Audio Codec', type: 'select', options: ['auto', 'copy', 'aac', 'mp3', 'libopus', 'libvorbis'], default: 'auto' },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Convert video from one format to another. Use "copy" for instant conversion without re-encoding.'
  },

  audio: {
    name: 'Audio',
    description: 'Extract or convert audio',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'extractAudio', label: 'Extract Audio Only', type: 'checkbox', default: false },
      { id: 'audioFormat', label: 'Audio Format', type: 'select', options: ['mp3', 'aac', 'wav', 'flac', 'ogg', 'm4a'], default: 'mp3' },
      { id: 'audioCodec', label: 'Audio Codec', type: 'select', options: ['auto', 'copy', 'libmp3lame', 'aac', 'flac', 'libopus'], default: 'auto' },
      { id: 'bitrate', label: 'Bitrate', type: 'select', options: ['128k', '192k', '256k', '320k'], default: '192k' },
      { id: 'sampleRate', label: 'Sample Rate', type: 'select', options: ['44100', '48000', '96000'], default: '48000' },
      { id: 'channels', label: 'Channels', type: 'select', options: ['keep', 'mono', 'stereo'], default: 'keep' },
      { id: 'volume', label: 'Volume', type: 'number', min: 0, max: 10, step: 0.1, default: 1.0 },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Extract audio from video or convert audio format. Higher bitrate = better quality but larger file.'
  },

  trim: {
    name: 'Trim',
    description: 'Cut video at specific times',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'startTime', label: 'Start Time', type: 'text', placeholder: '0 or 00:00:00' },
      { id: 'endTime', label: 'End Time', type: 'text', placeholder: 'optional or 00:00:00' },
      { id: 'duration', label: 'Duration', type: 'text', placeholder: 'optional (seconds)' },
      { id: 'keepOriginal', label: 'Keep Original Codec (fast)', type: 'checkbox', default: true },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Cut video at specific timestamps. Accepts seconds (10) or HH:MM:SS format. Stream copy is instant.'
  },

  filters: {
    name: 'Filters',
    description: 'Apply video transformations',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'scale', label: 'Scale (WxH)', type: 'text', placeholder: '1920:1080 or -1:1080' },
      { id: 'crop', label: 'Crop (WxH:X:Y)', type: 'text', placeholder: '1280:720:0:0' },
      { id: 'rotate', label: 'Rotate', type: 'select', options: ['0', '90', '180', '270', 'hflip', 'vflip'], default: '0' },
      { id: 'speed', label: 'Speed', type: 'number', min: 0.1, max: 10, step: 0.1, default: 1.0 },
      { id: 'deinterlace', label: 'Deinterlace', type: 'checkbox', default: false },
      { id: 'denoise', label: 'Denoise', type: 'select', options: ['none', 'light', 'medium', 'strong'], default: 'none' },
      { id: 'brightness', label: 'Brightness', type: 'number', min: -1, max: 1, step: 0.1, default: 0 },
      { id: 'contrast', label: 'Contrast', type: 'number', min: 0, max: 2, step: 0.1, default: 1 },
      { id: 'saturation', label: 'Saturation', type: 'number', min: 0, max: 3, step: 0.1, default: 1 },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Apply video filters. Use -1 in scale to auto-calculate dimension. Multiple filters chain together.'
  },

  encode: {
    name: 'Encode',
    description: 'Advanced encoding options',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'videoCodec', label: 'Video Codec', type: 'select', options: ['libx264', 'libx265', 'libvpx-vp9', 'libaom-av1', 'prores'], default: 'libx264' },
      { id: 'audioCodec', label: 'Audio Codec', type: 'select', options: ['aac', 'mp3', 'libopus', 'copy'], default: 'aac' },
      { id: 'resolution', label: 'Resolution', type: 'select', options: ['original', '4320p', '2160p', '1440p', '1080p', '720p', '480p', '360p'], default: 'original' },
      { id: 'bitrate', label: 'Video Bitrate', type: 'text', placeholder: '5000k or leave empty for CRF' },
      { id: 'crf', label: 'CRF (Quality)', type: 'number', min: 0, max: 51, default: 23 },
      { id: 'preset', label: 'Encoding Preset', type: 'select', options: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'], default: 'medium' },
      { id: 'framerate', label: 'Framerate', type: 'select', options: ['original', '60', '30', '24', '23.976'], default: 'original' },
      { id: 'pixFormat', label: 'Pixel Format', type: 'select', options: ['yuv420p', 'yuv422p', 'yuv444p'], default: 'yuv420p' },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'CRF: 18=visually lossless, 23=default, 51=worst. Lower preset = faster but bigger file.'
  },

  concat: {
    name: 'Concat',
    description: 'Join multiple videos',
    fields: [
      { id: 'inputFiles', label: 'Input Files (one per line)', type: 'textarea', placeholder: 'video1.mp4\nvideo2.mp4\nvideo3.mp4', required: true },
      { id: 'outputFile', label: 'Output File', type: 'text', placeholder: 'output.mp4' },
      { id: 'method', label: 'Concat Method', type: 'select', options: ['demuxer', 'protocol'], default: 'demuxer' },
      { id: 'videoCodec', label: 'Video Codec', type: 'select', options: ['copy', 'libx264'], default: 'copy' },
      { id: 'audioCodec', label: 'Audio Codec', type: 'select', options: ['copy', 'aac'], default: 'copy' },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Join multiple videos. Demuxer: all files must have same resolution/codec. Protocol: just concatenates bytes (for same format).'
  },

  subtitles: {
    name: 'Subtitles',
    description: 'Add or burn subtitles',
    fields: [
      { id: 'input', label: 'Input Video', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'subtitleFile', label: 'Subtitle File', type: 'text', placeholder: 'subtitles.srt', required: true },
      { id: 'burnIn', label: 'Burn Subtitles (permanent)', type: 'checkbox', default: true },
      { id: 'subCodec', label: 'Subtitle Codec', type: 'select', options: ['mov_text', 'srt', 'ass', 'copy'], default: 'mov_text' },
      { id: 'fontSize', label: 'Font Size', type: 'number', min: 8, max: 72, default: 24 },
      { id: 'fontColor', label: 'Font Color', type: 'text', default: 'white' },
      { id: 'position', label: 'Position', type: 'select', options: ['bottom', 'top', 'center'], default: 'bottom' },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Burned subtitles are permanently embedded. Soft subtitles (not burned) allow users to toggle them.'
  },

  gif: {
    name: 'GIF',
    description: 'Create animated GIF',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'startTime', label: 'Start Time', type: 'text', placeholder: '0 or 00:00:00', default: '0' },
      { id: 'duration', label: 'Duration (seconds)', type: 'number', min: 0.1, max: 60, step: 0.1, default: 5 },
      { id: 'width', label: 'Width', type: 'number', min: 50, max: 2000, default: 480 },
      { id: 'height', label: 'Height (-1 for auto)', type: 'number', min: -1, max: 2000, default: -1 },
      { id: 'fps', label: 'Frame Rate', type: 'number', min: 1, max: 60, default: 15 },
      { id: 'colors', label: 'Colors (2-256)', type: 'number', min: 2, max: 256, default: 256 },
      { id: 'outputFile', label: 'Output File', type: 'text', placeholder: 'output.gif', default: 'output.gif' }
    ],
    usage: 'Create animated GIF. Lower fps and colors = smaller file. Use -1 for height to maintain aspect ratio.'
  },

  thumbnails: {
    name: 'Thumbnails',
    description: 'Extract frames as images',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'outputPattern', label: 'Output Pattern', type: 'text', placeholder: 'frame_%04d.jpg', default: 'frame_%04d.jpg' },
      { id: 'extractMode', label: 'Extract Mode', type: 'select', options: ['all', 'single', 'interval'], default: 'single' },
      { id: 'frameNumber', label: 'Frame Number', type: 'number', min: 1, default: 1 },
      { id: 'timestamp', label: 'Timestamp', type: 'text', placeholder: '00:00:05' },
      { id: 'interval', label: 'Interval (seconds)', type: 'number', min: 0.1, default: 1 },
      { id: 'totalFrames', label: 'Total Frames', type: 'number', min: 1, default: 10 },
      { id: 'format', label: 'Output Format', type: 'select', options: ['jpg', 'png', 'webp'], default: 'jpg' },
      { id: 'quality', label: 'Quality (1-100)', type: 'number', min: 1, max: 100, default: 95 }
    ],
    usage: 'Extract single frame or multiple frames. Use %04d for sequential numbering (frame_0001.jpg, frame_0002.jpg).'
  },

  merge: {
    name: 'Merge',
    description: 'Combine video and audio',
    fields: [
      { id: 'videoFile', label: 'Video File', type: 'text', placeholder: 'video.mp4', required: true },
      { id: 'audioFile', label: 'Audio File', type: 'text', placeholder: 'audio.mp3', required: true },
      { id: 'outputFile', label: 'Output File', type: 'text', placeholder: 'output.mp4' },
      { id: 'videoCodec', label: 'Video Codec', type: 'select', options: ['copy', 'libx264'], default: 'copy' },
      { id: 'audioCodec', label: 'Audio Codec', type: 'select', options: ['copy', 'aac'], default: 'copy' },
      { id: 'sync', label: 'Sync A/V by Timestamp', type: 'checkbox', default: true },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Merge separate video and audio files. Use copy for instant merge without re-encoding.'
  },

  stream: {
    name: 'Stream',
    description: 'Stream to RTMP server',
    fields: [
      { id: 'input', label: 'Input Source', type: 'text', placeholder: 'input.mp4 or rtsp://camera URL', required: true },
      { id: 'streamUrl', label: 'Stream URL', type: 'text', placeholder: 'rtmp://live.example.com/app', required: true },
      { id: 'streamKey', label: 'Stream Key', type: 'password', placeholder: 'stream_key' },
      { id: 'videoCodec', label: 'Video Codec', type: 'select', options: ['libx264', 'libx265'], default: 'libx264' },
      { id: 'audioCodec', label: 'Audio Codec', type: 'select', options: ['aac', 'mp3'], default: 'aac' },
      { id: 'bitrate', label: 'Bitrate', type: 'text', default: '4500k' },
      { id: 'preset', label: 'Preset', type: 'select', options: ['ultrafast', 'veryfast', 'fast', 'medium'], default: 'veryfast' },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Stream to RTMP server (nginx-rtmp, YouTube Live, Twitch). Requires running ffmpeg continuously.'
  },

  metadata: {
    name: 'Metadata',
    description: 'Edit file metadata',
    fields: [
      { id: 'input', label: 'Input File', type: 'text', placeholder: 'input.mp4', required: true },
      { id: 'title', label: 'Title', type: 'text', placeholder: 'Video Title' },
      { id: 'artist', label: 'Artist', type: 'text', placeholder: 'Artist Name' },
      { id: 'album', label: 'Album', type: 'text', placeholder: 'Album Name' },
      { id: 'year', label: 'Year', type: 'number', min: 1900, max: 2100, placeholder: '2024' },
      { id: 'comment', label: 'Comment', type: 'text', placeholder: 'Comment' },
      { id: 'cover', label: 'Cover Image', type: 'text', placeholder: 'cover.jpg' },
      { id: 'action', label: 'Metadata Action', type: 'select', options: ['copy', 'set', 'clear'], default: 'set' },
      { id: 'outputFile', label: 'Output File', type: 'text', placeholder: 'output.mp4' },
      { id: 'overwrite', label: 'Overwrite Output', type: 'checkbox', default: true }
    ],
    usage: 'Edit metadata tags. Use cover image to add album art. Some formats have limited tag support.'
  }
};

export const resolutions = {
  'original': null,
  '4320p': { w: 7680, h: 4320 },
  '2160p': { w: 3840, h: 2160 },
  '1440p': { w: 2560, h: 1440 },
  '1080p': { w: 1920, h: 1080 },
  '720p': { w: 1280, h: 720 },
  '480p': { w: 854, h: 480 },
  '360p': { w: 640, h: 360 }
};
