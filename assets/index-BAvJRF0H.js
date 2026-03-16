(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={convert:{name:`Convert`,description:`Convert between video formats`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`format`,label:`Output Format`,type:`select`,options:[`mp4`,`mkv`,`webm`,`avi`,`mov`,`flv`,`wmv`],default:`mp4`},{id:`videoCodec`,label:`Video Codec`,type:`select`,options:[`auto`,`copy`,`libx264`,`libx265`,`libvpx-vp9`,`libaom-av1`],default:`auto`},{id:`audioCodec`,label:`Audio Codec`,type:`select`,options:[`auto`,`copy`,`aac`,`mp3`,`libopus`,`libvorbis`],default:`auto`},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Convert video from one format to another. Use "copy" for instant conversion without re-encoding.`},audio:{name:`Audio`,description:`Extract or convert audio`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`extractAudio`,label:`Extract Audio Only`,type:`checkbox`,default:!1},{id:`audioFormat`,label:`Audio Format`,type:`select`,options:[`mp3`,`aac`,`wav`,`flac`,`ogg`,`m4a`],default:`mp3`},{id:`audioCodec`,label:`Audio Codec`,type:`select`,options:[`auto`,`copy`,`libmp3lame`,`aac`,`flac`,`libopus`],default:`auto`},{id:`bitrate`,label:`Bitrate`,type:`select`,options:[`128k`,`192k`,`256k`,`320k`],default:`192k`},{id:`sampleRate`,label:`Sample Rate`,type:`select`,options:[`44100`,`48000`,`96000`],default:`48000`},{id:`channels`,label:`Channels`,type:`select`,options:[`keep`,`mono`,`stereo`],default:`keep`},{id:`volume`,label:`Volume`,type:`number`,min:0,max:10,step:.1,default:1},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Extract audio from video or convert audio format. Higher bitrate = better quality but larger file.`},trim:{name:`Trim`,description:`Cut video at specific times`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`startTime`,label:`Start Time`,type:`text`,placeholder:`0 or 00:00:00`},{id:`endTime`,label:`End Time`,type:`text`,placeholder:`optional or 00:00:00`},{id:`duration`,label:`Duration`,type:`text`,placeholder:`optional (seconds)`},{id:`keepOriginal`,label:`Keep Original Codec (fast)`,type:`checkbox`,default:!0},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Cut video at specific timestamps. Accepts seconds (10) or HH:MM:SS format. Stream copy is instant.`},filters:{name:`Filters`,description:`Apply video transformations`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`scale`,label:`Scale (WxH)`,type:`text`,placeholder:`1920:1080 or -1:1080`},{id:`crop`,label:`Crop (WxH:X:Y)`,type:`text`,placeholder:`1280:720:0:0`},{id:`rotate`,label:`Rotate`,type:`select`,options:[`0`,`90`,`180`,`270`,`hflip`,`vflip`],default:`0`},{id:`speed`,label:`Speed`,type:`number`,min:.1,max:10,step:.1,default:1},{id:`deinterlace`,label:`Deinterlace`,type:`checkbox`,default:!1},{id:`denoise`,label:`Denoise`,type:`select`,options:[`none`,`light`,`medium`,`strong`],default:`none`},{id:`brightness`,label:`Brightness`,type:`number`,min:-1,max:1,step:.1,default:0},{id:`contrast`,label:`Contrast`,type:`number`,min:0,max:2,step:.1,default:1},{id:`saturation`,label:`Saturation`,type:`number`,min:0,max:3,step:.1,default:1},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Apply video filters. Use -1 in scale to auto-calculate dimension. Multiple filters chain together.`},encode:{name:`Encode`,description:`Advanced encoding options`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`videoCodec`,label:`Video Codec`,type:`select`,options:[`libx264`,`libx265`,`libvpx-vp9`,`libaom-av1`,`prores`],default:`libx264`},{id:`audioCodec`,label:`Audio Codec`,type:`select`,options:[`aac`,`mp3`,`libopus`,`copy`],default:`aac`},{id:`resolution`,label:`Resolution`,type:`select`,options:[`original`,`4320p`,`2160p`,`1440p`,`1080p`,`720p`,`480p`,`360p`],default:`original`},{id:`bitrate`,label:`Video Bitrate`,type:`text`,placeholder:`5000k or leave empty for CRF`},{id:`crf`,label:`CRF (Quality)`,type:`number`,min:0,max:51,default:23},{id:`preset`,label:`Encoding Preset`,type:`select`,options:[`ultrafast`,`superfast`,`veryfast`,`faster`,`fast`,`medium`,`slow`,`slower`,`veryslow`],default:`medium`},{id:`framerate`,label:`Framerate`,type:`select`,options:[`original`,`60`,`30`,`24`,`23.976`],default:`original`},{id:`pixFormat`,label:`Pixel Format`,type:`select`,options:[`yuv420p`,`yuv422p`,`yuv444p`],default:`yuv420p`},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`CRF: 18=visually lossless, 23=default, 51=worst. Lower preset = faster but bigger file.`},concat:{name:`Concat`,description:`Join multiple videos`,fields:[{id:`inputFiles`,label:`Input Files (one per line)`,type:`textarea`,placeholder:`video1.mp4
video2.mp4
video3.mp4`,required:!0},{id:`outputFile`,label:`Output File`,type:`text`,placeholder:`output.mp4`},{id:`method`,label:`Concat Method`,type:`select`,options:[`demuxer`,`protocol`],default:`demuxer`},{id:`videoCodec`,label:`Video Codec`,type:`select`,options:[`copy`,`libx264`],default:`copy`},{id:`audioCodec`,label:`Audio Codec`,type:`select`,options:[`copy`,`aac`],default:`copy`},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Join multiple videos. Demuxer: all files must have same resolution/codec. Protocol: just concatenates bytes (for same format).`},subtitles:{name:`Subtitles`,description:`Add or burn subtitles`,fields:[{id:`input`,label:`Input Video`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`subtitleFile`,label:`Subtitle File`,type:`text`,placeholder:`subtitles.srt`,required:!0},{id:`burnIn`,label:`Burn Subtitles (permanent)`,type:`checkbox`,default:!0},{id:`subCodec`,label:`Subtitle Codec`,type:`select`,options:[`mov_text`,`srt`,`ass`,`copy`],default:`mov_text`},{id:`fontSize`,label:`Font Size`,type:`number`,min:8,max:72,default:24},{id:`fontColor`,label:`Font Color`,type:`text`,default:`white`},{id:`position`,label:`Position`,type:`select`,options:[`bottom`,`top`,`center`],default:`bottom`},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Burned subtitles are permanently embedded. Soft subtitles (not burned) allow users to toggle them.`},gif:{name:`GIF`,description:`Create animated GIF`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`startTime`,label:`Start Time`,type:`text`,placeholder:`0 or 00:00:00`,default:`0`},{id:`duration`,label:`Duration (seconds)`,type:`number`,min:.1,max:60,step:.1,default:5},{id:`width`,label:`Width`,type:`number`,min:50,max:2e3,default:480},{id:`height`,label:`Height (-1 for auto)`,type:`number`,min:-1,max:2e3,default:-1},{id:`fps`,label:`Frame Rate`,type:`number`,min:1,max:60,default:15},{id:`colors`,label:`Colors (2-256)`,type:`number`,min:2,max:256,default:256},{id:`outputFile`,label:`Output File`,type:`text`,placeholder:`output.gif`,default:`output.gif`}],usage:`Create animated GIF. Lower fps and colors = smaller file. Use -1 for height to maintain aspect ratio.`},thumbnails:{name:`Thumbnails`,description:`Extract frames as images`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`outputPattern`,label:`Output Pattern`,type:`text`,placeholder:`frame_%04d.jpg`,default:`frame_%04d.jpg`},{id:`extractMode`,label:`Extract Mode`,type:`select`,options:[`all`,`single`,`interval`],default:`single`},{id:`frameNumber`,label:`Frame Number`,type:`number`,min:1,default:1},{id:`timestamp`,label:`Timestamp`,type:`text`,placeholder:`00:00:05`},{id:`interval`,label:`Interval (seconds)`,type:`number`,min:.1,default:1},{id:`totalFrames`,label:`Total Frames`,type:`number`,min:1,default:10},{id:`format`,label:`Output Format`,type:`select`,options:[`jpg`,`png`,`webp`],default:`jpg`},{id:`quality`,label:`Quality (1-100)`,type:`number`,min:1,max:100,default:95}],usage:`Extract single frame or multiple frames. Use %04d for sequential numbering (frame_0001.jpg, frame_0002.jpg).`},merge:{name:`Merge`,description:`Combine video and audio`,fields:[{id:`videoFile`,label:`Video File`,type:`text`,placeholder:`video.mp4`,required:!0},{id:`audioFile`,label:`Audio File`,type:`text`,placeholder:`audio.mp3`,required:!0},{id:`outputFile`,label:`Output File`,type:`text`,placeholder:`output.mp4`},{id:`videoCodec`,label:`Video Codec`,type:`select`,options:[`copy`,`libx264`],default:`copy`},{id:`audioCodec`,label:`Audio Codec`,type:`select`,options:[`copy`,`aac`],default:`copy`},{id:`sync`,label:`Sync A/V by Timestamp`,type:`checkbox`,default:!0},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Merge separate video and audio files. Use copy for instant merge without re-encoding.`},stream:{name:`Stream`,description:`Stream to RTMP server`,fields:[{id:`input`,label:`Input Source`,type:`text`,placeholder:`input.mp4 or rtsp://camera URL`,required:!0},{id:`streamUrl`,label:`Stream URL`,type:`text`,placeholder:`rtmp://live.example.com/app`,required:!0},{id:`streamKey`,label:`Stream Key`,type:`password`,placeholder:`stream_key`},{id:`videoCodec`,label:`Video Codec`,type:`select`,options:[`libx264`,`libx265`],default:`libx264`},{id:`audioCodec`,label:`Audio Codec`,type:`select`,options:[`aac`,`mp3`],default:`aac`},{id:`bitrate`,label:`Bitrate`,type:`text`,default:`4500k`},{id:`preset`,label:`Preset`,type:`select`,options:[`ultrafast`,`veryfast`,`fast`,`medium`],default:`veryfast`},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Stream to RTMP server (nginx-rtmp, YouTube Live, Twitch). Requires running ffmpeg continuously.`},metadata:{name:`Metadata`,description:`Edit file metadata`,fields:[{id:`input`,label:`Input File`,type:`text`,placeholder:`input.mp4`,required:!0},{id:`title`,label:`Title`,type:`text`,placeholder:`Video Title`},{id:`artist`,label:`Artist`,type:`text`,placeholder:`Artist Name`},{id:`album`,label:`Album`,type:`text`,placeholder:`Album Name`},{id:`year`,label:`Year`,type:`number`,min:1900,max:2100,placeholder:`2024`},{id:`comment`,label:`Comment`,type:`text`,placeholder:`Comment`},{id:`cover`,label:`Cover Image`,type:`text`,placeholder:`cover.jpg`},{id:`action`,label:`Metadata Action`,type:`select`,options:[`copy`,`set`,`clear`],default:`set`},{id:`outputFile`,label:`Output File`,type:`text`,placeholder:`output.mp4`},{id:`overwrite`,label:`Overwrite Output`,type:`checkbox`,default:!0}],usage:`Edit metadata tags. Use cover image to add album art. Some formats have limited tag support.`}},t={original:null,"4320p":{w:7680,h:4320},"2160p":{w:3840,h:2160},"1440p":{w:2560,h:1440},"1080p":{w:1920,h:1080},"720p":{w:1280,h:720},"480p":{w:854,h:480},"360p":{w:640,h:360}};function n(e){if(!e||e===``)return``;let t=e.trim();if(/^\d+$/.test(t)||/^\d+\.\d+$/.test(t))return t;let n=t.split(`:`).map(Number);if(n.length===3&&!isNaN(n[0])&&!isNaN(n[1])&&!isNaN(n[2])){let[e,t,r]=n;return`${e.toString().padStart(2,`0`)}:${t.toString().padStart(2,`0`)}:${r.toString().padStart(2,`0`)}`}if(n.length===2&&!isNaN(n[0])&&!isNaN(n[1])){let[e,t]=n;return`${e.toString().padStart(2,`0`)}:${t.toString().padStart(2,`0`)}`}return t}function r(e){if(!e)return`output`;let t=e.lastIndexOf(`.`);return t>0?e.substring(0,t):e}function i(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;e.overwrite&&(t+=` -y`);let i=n(e.startTime);i&&(t+=` -ss ${i}`),t+=` -i "${e.input}"`,e.videoCodec&&e.videoCodec!==`auto`&&(t+=` -c:v ${e.videoCodec}`),e.audioCodec&&e.audioCodec!==`auto`&&(t+=` -c:a ${e.audioCodec}`);let a=r(e.input)+`.`+(e.format||`mp4`);return t+=` "${a}"`,t}function a(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;e.overwrite&&(t+=` -y`),t+=` -i "${e.input}"`;let n=[];e.volume&&e.volume!==1&&n.push(`volume=${e.volume}`),e.extractAudio&&(t+=` -vn`),e.audioCodec&&e.audioCodec!==`auto`?t+=` -c:a ${e.audioCodec}`:e.audioFormat&&(t+=` -c:a ${{mp3:`libmp3lame`,aac:`aac`,wav:`pcm_s16le`,flac:`flac`,ogg:`libvorbis`,m4a:`aac`}[e.audioFormat]||`aac`}`),e.bitrate&&(t+=` -b:a ${e.bitrate}`),e.sampleRate&&(t+=` -ar ${e.sampleRate}`),e.channels&&e.channels!==`keep`&&(t+=` -ac ${e.channels===`mono`?1:2}`),n.length>0&&(t+=` -af "${n.join(`,`)}"`);let i=e.audioFormat||`mp3`,a=r(e.input)+`.`+i;return t+=` "${a}"`,t}function o(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;e.overwrite&&(t+=` -y`);let i=n(e.startTime);if(i&&(t+=` -ss ${i}`),t+=` -i "${e.input}"`,e.duration)t+=` -t ${e.duration}`;else if(e.endTime){let r=n(e.endTime);r&&(t+=` -to ${r}`)}e.keepOriginal?t+=` -c copy`:(e.videoCodec&&(t+=` -c:v libx264`),e.audioCodec&&(t+=` -c:a aac`));let a=r(e.input)+`_trimmed.mp4`;return t+=` "${a}"`,t}function s(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;e.overwrite&&(t+=` -y`),t+=` -i "${e.input}"`;let n=[];e.scale&&n.push(`scale=${e.scale}`),e.crop&&n.push(`crop=${e.crop}`),e.rotate&&e.rotate!==`0`&&(e.rotate===`hflip`?n.push(`hflip`):e.rotate===`vflip`?n.push(`vflip`):n.push({90:`transpose=1`,180:`transpose=2,transpose=2`,270:`transpose=2`}[e.rotate]||``)),e.speed&&e.speed!==1&&(n.push(`setpts=${1/e.speed}*PTS`),e.disableAudioSpeed||(t+=` -af "atempo=${e.speed}"`)),e.deinterlace&&n.push(`yadif`),e.denoise&&e.denoise!==`none`&&n.push({light:`hqdn3d=2:1:3:3`,medium:`hqdn3d=4:3:6:6`,strong:`hqdn3d=8:6:12:12`}[e.denoise]),e.brightness&&e.brightness!==0&&n.push(`eq=brightness=${e.brightness}`),e.contrast&&e.contrast!==1&&n.push(`eq=contrast=${e.contrast}`),e.saturation&&e.saturation!==1&&n.push(`eq=saturation=${e.saturation}`),n.length>0&&(t+=` -vf "${n.join(`,`)}"`);let i=r(e.input)+`_filtered.mp4`;return t+=` "${i}"`,t}function c(e){if(!e.input)return`# Add an input file to generate command`;let n=`ffmpeg`;if(e.overwrite&&(n+=` -y`),n+=` -i "${e.input}"`,n+=` -c:v ${e.videoCodec||`libx264`}`,n+=` -c:a ${e.audioCodec||`aac`}`,e.resolution&&e.resolution!==`original`){let r=t[e.resolution];r&&(n+=` -s ${r.w}x${r.h}`)}e.bitrate?(n+=` -b:v ${e.bitrate}`,n+=` -maxrate ${e.bitrate}`,n+=` -bufsize ${e.bitrate}`):e.crf&&(n+=` -crf ${e.crf}`),e.preset&&(n+=` -preset ${e.preset}`),e.framerate&&e.framerate!==`original`&&(n+=` -r ${e.framerate}`),e.pixFormat&&(n+=` -pix_fmt ${e.pixFormat}`);let i=r(e.input)+`_encoded.mp4`;return n+=` "${i}"`,n}function l(e){if(!e.inputFiles)return`# Add input files to generate command`;let t=e.inputFiles.split(`
`).filter(e=>e.trim());if(t.length<2)return`# Need at least 2 files to concatenate`;if(e.method===`protocol`){let n=`ffmpeg`;e.overwrite&&(n+=` -y`),n+=` -i "concat:`,n+=t.map(e=>e.trim()).join(`|`),n+=`"`,e.videoCodec&&e.videoCodec!==`copy`&&(n+=` -c:v ${e.videoCodec}`),e.audioCodec&&e.audioCodec!==`copy`&&(n+=` -c:a ${e.audioCodec}`);let r=e.outputFile||`output.mp4`;return n+=` "${r}"`,n}let n=`concat_list.txt`,r=`# Create list file:\necho "${t.map(e=>`file '${e.trim()}'`).join(`\\n`)}" > ${n}\n\n`;r+=`ffmpeg`,e.overwrite&&(r+=` -y`),r+=` -f concat -safe 0 -i ${n}`,e.videoCodec&&e.videoCodec!==`copy`&&(r+=` -c:v ${e.videoCodec}`),e.audioCodec&&e.audioCodec!==`copy`&&(r+=` -c:a ${e.audioCodec}`);let i=e.outputFile||`output.mp4`;return r+=` "${i}"`,r}function u(e){if(!e.input)return`# Add an input video to generate command`;if(!e.subtitleFile)return`# Add a subtitle file to generate command`;let t=`ffmpeg`;if(e.overwrite&&(t+=` -y`),t+=` -i "${e.input}"`,t+=` -i "${e.subtitleFile}"`,e.burnIn){let n=``;if(e.fontSize||e.fontColor||e.position){let t=e.fontSize||24,r=e.fontColor||`white`,i=e.position||`bottom`;n=`subtitles=${e.subtitleFile}:force_style='Fontsize=${t},PrimaryColour=&H${r.replace(`white`,`FFFFFF`).replace(`black`,`000000`)},MarginV=${i===`bottom`?10:20}'`}else n=`subtitles=${e.subtitleFile}`;t+=` -vf "${n}"`}else t+=` -c:s ${e.subCodec||`mov_text`}`,t+=` -c copy`;let n=r(e.input)+`_subtitled.mp4`;return t+=` "${n}"`,t}function d(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;t+=` -i "${e.input}"`;let r=n(e.startTime)||`0`;t+=` -ss ${r}`;let i=e.duration||5;t+=` -t ${i}`;let a=e.height===-1?`${e.width}:-1`:e.width?`${e.width}:${e.height||-2}`:`-1:-1`,o=e.fps||15,s=e.colors||256;t+=` -vf "fps=${o},scale=${a}:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=${s}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5"`;let c=e.outputFile||`output.gif`;return t+=` "${c}"`,t}function f(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;t+=` -i "${e.input}"`;let r=e.outputPattern||`frame_%04d.jpg`,i=e.format||`jpg`;if(e.extractMode===`single`){if(e.timestamp)t+=` -ss ${n(e.timestamp)}`;else if(e.frameNumber){let n=(e.frameNumber-1)/25;t+=` -ss ${n}`}let i=r.replace(`%04d`,`001`);return t+=` -vframes 1 "${i}"`,t}return e.extractMode===`interval`&&(t+=` -vf "fps=1/${e.interval||1}"`),e.totalFrames&&(t+=` -vframes ${e.totalFrames}`),i===`png`?t+=` -c:v png`:i===`webp`?t+=` -c:v libwebp`:t+=` -q:v 2`,t+=` "${r}"`,t}function p(e){if(!e.videoFile)return`# Add a video file to generate command`;if(!e.audioFile)return`# Add an audio file to generate command`;let t=`ffmpeg`;e.overwrite&&(t+=` -y`),t+=` -i "${e.videoFile}"`,t+=` -i "${e.audioFile}"`,t+=` -c:v ${e.videoCodec||`copy`}`,t+=` -c:a ${e.audioCodec||`aac`}`,e.sync&&(t+=` -map_metadata 0`);let n=e.outputFile||r(e.videoFile)+`_merged.mp4`;return t+=` "${n}"`,t}function m(e){if(!e.input)return`# Add an input source to generate command`;if(!e.streamUrl)return`# Add a stream URL to generate command`;let t=`ffmpeg`;t+=` -re -i "${e.input}"`,t+=` -c:v ${e.videoCodec||`libx264`}`,t+=` -c:a ${e.audioCodec||`aac`}`;let n=e.bitrate||`4500k`;t+=` -b:v ${n}`,t+=` -maxrate ${n}`,t+=` -bufsize ${n}`,e.preset&&(t+=` -preset ${e.preset}`),t+=` -f flv`;let r=e.streamUrl;return e.streamKey&&(r+=`/${e.streamKey}`),t+=` "${r}"`,t}function h(e){if(!e.input)return`# Add an input file to generate command`;let t=`ffmpeg`;if(e.overwrite&&(t+=` -y`),t+=` -i "${e.input}"`,e.action===`clear`)t+=` -map_metadata - -c:v copy -c:a copy`;else if(e.action===`set`||!e.action){let n=[];e.title&&n.push(`title=${e.title}`),e.artist&&n.push(`artist=${e.artist}`),e.album&&n.push(`album=${e.album}`),e.year&&n.push(`date=${e.year}`),e.comment&&n.push(`comment=${e.comment}`),n.length>0&&(t+=` -metadata "${n.join(`,`)}"`),e.cover&&(t+=` -i "${e.cover}" -map 0 -map 1 -c copy -disposition:v:0 attached_pic`)}else t+=` -c copy -map_metadata 0`;let n=e.outputFile||r(e.input)+`_metadata.mp4`;return t+=` "${n}"`,t}function g(e,t){let n={overwrite:!0,crf:23,preset:`medium`,format:`mp4`,audioFormat:`mp3`,bitrate:`192k`,sampleRate:`48000`,channels:`keep`,volume:1,keepOriginal:!0,fps:15,colors:256,quality:95,...t},r={convert:i,audio:a,trim:o,filters:s,encode:c,concat:l,subtitles:u,gif:d,thumbnails:f,merge:p,stream:m,metadata:h}[e];return r?r(n):`# Unknown operation`}function _(e){return{convert:`Convert video from one format to another. Use "copy" for instant conversion without re-encoding.`,audio:`Extract audio from video or convert audio format. Higher bitrate = better quality but larger file.`,trim:`Cut video at specific timestamps. Accepts seconds (10) or HH:MM:SS format. Stream copy is instant.`,filters:`Apply video filters. Use -1 in scale to auto-calculate dimension. Multiple filters chain together.`,encode:`CRF: 18=visually lossless, 23=default, 51=worst. Lower preset = faster but bigger file.`,concat:`Join multiple videos. Demuxer: all files must have same resolution/codec. Protocol: just concatenates bytes.`,subtitles:`Burned subtitles are permanently embedded. Soft subtitles allow users to toggle them.`,gif:`Create animated GIF. Lower fps and colors = smaller file. Use -1 for height to maintain aspect ratio.`,thumbnails:`Extract single frame or multiple frames. Use %04d for sequential numbering.`,merge:`Merge separate video and audio files. Use copy for instant merge without re-encoding.`,stream:`Stream to RTMP server. Requires running ffmpeg continuously.`,metadata:`Edit metadata tags. Some formats have limited tag support.`}[e]||``}var v=Object.keys(e),y={convert:`arrow.down.doc`,audio:`music.note`,trim:`scissors`,filters:`slider.horizontal.3`,encode:`gearshape`,concat:`link`,subtitles:`captions.bubble`,gif:`photo.stack`,thumbnails:`camera`,merge:`rectangle.on.rectangle`,stream:`antenna.radiowaves.left.and.right`,metadata:`tag`},b={convert:`arrow.down.doc`,audio:`music.note`,trim:`scissors`,filters:`slider.horizontal.3`,encode:`gearshape`,concat:`link`,subtitles:`captions.bubble`,gif:`photo.stack`,thumbnails:`camera`,merge:`rectangle.on.rectangle`,stream:`antenna.radiowaves.left.and.right`,metadata:`tag`},x={"arrow.down.doc":`M4 14v6h6M10 4v16M20 20l-8-8M14.5 5.5L20 12`,"music.note":`M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z`,scissors:`M6 9l6 6-6 6M14 9l-4 4 4 4M9 6v4M15 6v4M6 18v2M18 18v2`,"slider.horizontal.3":`M4 21v-2M4 13V7M12 21v-4M12 13V7M20 21v-6M20 13V7M2 9h4M14 9h4M18 9h2M6 15h2`,gearshape:`M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z`,link:`M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71`,"captions.bubble":`M4 4h16v12H5.17L4 17.17V4m4-2h12m-4-2v8m-4-6h8`,"photo.stack":`M4 4h3l2-2h6l2 2h3a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM8 14l2-2 2 2 2-2 2 2`,camera:`M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 13a4 4 0 100-8 4 4 0 000 8z`,"rectangle.on.rectangle":`M4 6h16v12H4zM4 6a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2zM9 12h6`,"antenna.radiowaves.left.and.right":`M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01`,tag:`M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01`},S={activeTab:`convert`,formData:{},copied:!1,theme:`mocha`},C=null;function w(){return localStorage.getItem(`ffmpeg-theme`)||(window.matchMedia(`(prefers-color-scheme: light)`).matches?`latte`:`mocha`)}function T(){S.theme=w(),document.documentElement.setAttribute(`data-theme`,S.theme)}function E(){let t=e[S.activeTab],n={};t.fields.forEach(e=>{e.default===void 0?e.type===`checkbox`&&(n[e.id]=!1):n[e.id]=e.default}),S.formData=n}function D(){return v.map(t=>`
    <button 
      class="tab-btn ${S.activeTab===t?`active`:``}" 
      data-tab="${t}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="${x[y[t]]}"></path>
      </svg>
      <span>${e[t].name}</span>
    </button>
  `).join(``)}function O(e){let t=S.formData[e.id]??e.default??``;switch(e.type){case`text`:case`password`:return`
        <div class="field">
          <label for="${e.id}">${e.label}${e.required?` *`:``}</label>
          <input 
            type="${e.type}" 
            id="${e.id}" 
            placeholder="${e.placeholder||``}"
            value="${t}"
            ${e.required?`required`:``}
          >
        </div>
      `;case`number`:return`
        <div class="field">
          <label for="${e.id}">${e.label}</label>
          <input 
            type="number" 
            id="${e.id}" 
            min="${e.min??``}"
            max="${e.max??``}"
            step="${e.step??1}"
            placeholder="${e.placeholder??``}"
            value="${t}"
          >
        </div>
      `;case`select`:{let n=e.options.map(e=>`<option value="${e}" ${t===e?`selected`:``}>${e}</option>`).join(``);return`
        <div class="field">
          <label for="${e.id}">${e.label}</label>
          <select id="${e.id}">${n}</select>
        </div>
      `}case`checkbox`:return`
        <div class="field checkbox-field">
          <label>
            <input 
              type="checkbox" 
              id="${e.id}" 
              ${t?`checked`:``}
            >
            <span class="checkbox-custom"></span>
            ${e.label}
          </label>
        </div>
      `;case`textarea`:return`
        <div class="field">
          <label for="${e.id}">${e.label}${e.required?` *`:``}</label>
          <textarea 
            id="${e.id}" 
            rows="4"
            placeholder="${e.placeholder||``}"
          >${t}</textarea>
        </div>
      `;default:return``}}function k(){let t=e[S.activeTab];return`
    <div class="form-section">
      <div class="form-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${x[b[S.activeTab]]}"></path>
        </svg>
        <div class="title-group">
          <h2>${t.name}</h2>
          <p>${t.description}</p>
        </div>
      </div>
      <div class="form-fields">
        ${t.fields.map(O).join(``)}
      </div>
    </div>
  `}function A(){let e=g(S.activeTab,S.formData);return`
    <div class="command-section">
      <div class="command-header">
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          Generated Command
        </h3>
        <button class="copy-btn ${S.copied?`copied`:``}" id="copyBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${S.copied?`<polyline points="20 6 9 17 4 12"></polyline>`:`<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>`}
          </svg>
          ${S.copied?`Copied!`:`Copy`}
        </button>
      </div>
      <div class="terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <button class="terminal-btn close"></button>
            <button class="terminal-btn minimize"></button>
            <button class="terminal-btn maximize"></button>
          </div>
          <span class="terminal-title">zsh</span>
          <div style="width: 46px"></div>
        </div>
        <div class="terminal-body">
          <div class="command-preview">
            <code>${M(e)}</code>
            <span class="cursor">▌</span>
          </div>
        </div>
      </div>
    </div>
  `}function j(){let e=_(S.activeTab);return e?`
    <div class="usage-section">
      <details>
        <summary>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"></path>
          </svg>
          Usage Guide
        </summary>
        <p>${e}</p>
      </details>
    </div>
  `:``}function M(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function N(){let e=document.querySelector(`.theme-toggle svg`);e&&(e.innerHTML=S.theme===`mocha`?`<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>`:`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`)}function P(){S.theme=S.theme===`mocha`?`latte`:`mocha`,document.documentElement.setAttribute(`data-theme`,S.theme),localStorage.setItem(`ffmpeg-theme`,S.theme),N()}function F(){let e=document.querySelector(`#app`);e.innerHTML=`
    <div class="app-container">
      <header class="app-header">
        <div class="logo">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2"></rect>
              <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"></path>
            </svg>
          </div>
          <h1>FFmpeg Command Generator</h1>
        </div>
        <button class="theme-toggle" id="themeToggle" title="Toggle theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${S.theme===`mocha`?`<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>`:`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`}
          </svg>
        </button>
      </header>
      
      <nav class="tab-nav">
        ${D()}
      </nav>
      
      <main class="app-main">
        ${k()}
        ${A()}
        ${j()}
      </main>
      
      <footer class="app-footer">
        <p>Generated commands are for terminal use &bull; <a href="https://ffmpeg.org/documentation.html" target="_blank" rel="noopener">FFmpeg Docs</a></p>
      </footer>
    </div>
  `,I()}function I(){let e=document.getElementById(`themeToggle`);e&&e.addEventListener(`click`,P),v.forEach(e=>{let t=document.querySelector(`[data-tab="${e}"]`);t&&t.addEventListener(`click`,()=>{S.activeTab=e,E(),F()})});let t=document.querySelector(`.form-fields`);t&&(t.addEventListener(`input`,L),t.addEventListener(`change`,L));let n=document.getElementById(`copyBtn`);n&&n.addEventListener(`click`,B)}function L(t){let n=t.target,r=n.id,i=e[S.activeTab].fields.find(e=>e.id===r);if(!i)return;let a=i.type===`checkbox`?n.checked:n.value;S.formData[r]=a,R()}function R(){C&&clearTimeout(C),C=setTimeout(z,50)}function z(){let e=document.querySelector(`.command-preview code`);e&&(e.innerHTML=M(g(S.activeTab,S.formData)))}function B(){let e=g(S.activeTab,S.formData);navigator.clipboard.writeText(e).then(()=>{S.copied=!0;let e=document.getElementById(`copyBtn`);e&&(e.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      `,e.classList.add(`copied`)),setTimeout(()=>{S.copied=!1;let e=document.getElementById(`copyBtn`);e&&(e.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
          Copy
        `,e.classList.remove(`copied`))},2e3)})}T(),E(),F();