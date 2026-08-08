// type DeviceType = 'mac' | 'phone' | 'full';
// type ContentType = 'live' | 'static';

// interface DeviceFrameProps {
//   device: DeviceType;
//   contentType: ContentType;
//   content: string; // URL for live, image path for static
//   onClose?: () => void;
//   onDeviceChange?: (device: DeviceType) => void;
// }

// export function DeviceFrame({ device, contentType, content, onClose, onDeviceChange }: DeviceFrameProps) {

//   if (device === 'full') {
//     return (
//       <div className="w-full h-full">
//         {contentType === 'live' ? (
//           <iframe
//             src={content}
//             className="h-full w-full border-0"
//             title="Live preview"
//             loading="lazy"
//           />
//         ) : (
//           <img
//             src={content}
//             alt="Project preview"
//             className="h-full w-full object-contain"
//           />
//         )}
//       </div>
//     );
//   }

//   if (device === 'mac') {
//     return (
//       <div className="relative mx-auto w-[800px] max-w-full" onClick={(e) => { e.stopPropagation(); onDeviceChange?.('mac'); }}>
//         {/* Browser Window Frame */}
//         <div className="rounded-lg bg-[#e8e8e8] shadow-2xl overflow-hidden">
//           {/* Title Bar */}
//           <div className="flex items-center gap-2 px-3 py-2 bg-[#d1d1d1] border-b border-[#b0b0b0]">
//             {/* Control Buttons */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => onClose?.()}
//                 className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
//                 aria-label="Close frame"
//               />
//               <button
//                 onClick={() => onDeviceChange?.('phone')}
//                 className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
//                 aria-label="Minimize to phone"
//               />
//               <button
//                 onClick={() => {
//                   if (contentType === 'live' && content) {
//                     window.open(content, '_blank');
//                   }
//                 }}
//                 className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
//                 aria-label="Open in new window"
//               />
//             </div>
//             {/* Address Bar */}
//             <div className="flex-1 mx-2 h-6 rounded bg-white px-3 flex items-center text-xs text-gray-600">
//               {contentType === 'live' ? content : 'Preview'}
//             </div>
//             {/* Navigation Arrows */}
//             <div className="flex gap-1">
//               <button className="p-1 rounded hover:bg-[#c0c0c0] transition-colors" aria-label="Back">
//                 <svg className="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button className="p-1 rounded hover:bg-[#c0c0c0] transition-colors" aria-label="Forward">
//                 <svg className="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//           {/* Content Area */}
//           <div className="w-full overflow-auto bg-white" style={{ aspectRatio: '1470/956', maxHeight: 'calc(90vh - 60px)' }}>
//             {contentType === 'live' ? (
//               <iframe
//                 src={content}
//                 className="h-full w-full border-0"
//                 title="Live preview"
//                 loading="lazy"
//                 style={{ 
//                   transform: 'scale(0.6)',
//                   transformOrigin: 'top left',
//                   width: '166.67%',
//                   height: '166.67%'
//                 }}
//               />
//             ) : (
//               <img
//                 src={content}
//                 alt="Project preview"
//                 className="w-full"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (device === 'phone') {
//     return (
//       <div className="relative mx-auto w-full max-w-[250px]" onClick={(e) => { e.stopPropagation(); onDeviceChange?.('phone'); }}>
//         <div className="relative rounded-[20px] bg-[#1a1a1a] p-[4px] shadow-2xl">
//           <div className="relative overflow-auto rounded-[16px] bg-black">
//             <div className="w-full overflow-auto bg-white" style={{ aspectRatio: '9/19.5', maxHeight: 'calc(90vh - 60px)' }}>
//               {contentType === 'live' ? (
//                 <iframe
//                   src={content}
//                   className="h-full w-full border-0"
//                   title="Live preview"
//                   loading="lazy"
//                   style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '222%', height: '222%' }}
//                 />
//               ) : (
//                 <img
//                   src={content}
//                   alt="Project preview"
//                   className="w-full"
//                 />
//               )}
//             </div>
//           </div>
//           <div className="absolute left-1/2 top-0 h-[16px] w-[60px] -translate-x-1/2 rounded-b-[8px] bg-[#1a1a1a]" />
//           <div className="absolute bottom-[6px] left-1/2 h-[3px] w-[80px] -translate-x-1/2 rounded-full bg-white/30" />
//         </div>
//       </div>
//     );
//   }

//   return null;
// }
import { useEffect, useState } from 'react';
// import { useImageCache } from '../hooks/useImageCache';

type DeviceType = 'mac' | 'phone' | 'full';
type ContentType = 'live' | 'static';

interface DeviceFrameProps {
  device: DeviceType;
  contentType: ContentType;
  content: string; // URL for live, image path for static
  onClose?: () => void;
  onDeviceChange?: (device: DeviceType) => void;
}

export function DeviceFrame({ device, contentType, content, onClose, onDeviceChange }: DeviceFrameProps) {
  // const { isCacheReady, cacheImage } = useImageCache();
  const [cachedContent, setCachedContent] = useState<string>(content);

  if (device === 'full') {
    return (
      <div className="w-full h-full">
        {contentType === 'live' ? (
          <iframe
            src={content}
            className="h-full w-full border-0"
            title="Live preview"
            loading="lazy"
          />
        ) : (
          <img
            src={cachedContent}
            alt="Project preview"
            className="h-full w-full object-contain"
          />
        )}
      </div>
    );
  }

  if (device === 'mac') {
    return (
      <div className="relative mx-auto w-[800px] max-w-full" onClick={(e) => { e.stopPropagation(); onDeviceChange?.('mac'); }}>
        {/* Browser Window Frame */}
        <div className="rounded-lg bg-[#e8e8e8] shadow-2xl overflow-hidden">
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#d1d1d1] border-b border-[#b0b0b0]">
            {/* Control Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onClose?.()}
                className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                aria-label="Close frame"
              />
              <button
                onClick={() => onDeviceChange?.('phone')}
                className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                aria-label="Minimize to phone"
              />
              <button
                onClick={() => {
                  if (contentType === 'live' && content) {
                    window.open(content, '_blank');
                  }
                }}
                className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                aria-label="Open in new window"
              />
            </div>
            {/* Address Bar */}
            <div className="flex-1 mx-2 h-6 rounded bg-white px-3 flex items-center text-xs text-gray-600">
              {contentType === 'live' ? content : 'Preview'}
            </div>
            {/* Navigation Arrows */}
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-[#c0c0c0] transition-colors" aria-label="Back">
                <svg className="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 rounded hover:bg-[#c0c0c0] transition-colors" aria-label="Forward">
                <svg className="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          {/* Content Area */}
          <div className={`w-full bg-white ${contentType === 'live' ? 'overflow-hidden' : 'overflow-auto'}`} style={{ aspectRatio: '1470/956', maxHeight: 'calc(90vh - 60px)' }}>
            {contentType === 'live' ? (
              <iframe
                src={content}
                className="h-full w-full border-0"
                title="Live preview"
                loading="lazy"
                style={{ 
                  transform: 'scale(0.6)',
                  transformOrigin: 'top left',
                  width: '166.67%',
                  height: '166.67%',
                  
                }}
              />
            ) : (
              <img
                src={cachedContent}
                alt="Project preview"
                className="w-full"
                style={{ maxWidth: '100%' }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (device === 'phone') {
    return (
      <div className="relative mx-auto w-full max-w-[250px]" onClick={(e) => { e.stopPropagation(); onDeviceChange?.('phone'); }}>
        <div className="relative rounded-[20px] bg-[#1a1a1a] p-[4px] shadow-2xl">
          <div className="relative overflow-hidden rounded-[16px] bg-black">
            <div className={`w-full bg-white ${contentType === 'live' ? 'overflow-hidden' : 'overflow-auto'}`} style={{ aspectRatio: '9/19.5', maxHeight: 'calc(90vh - 60px)' }}>
              {contentType === 'live' ? (
                <iframe
                  src={content}
                  className="h-full w-full border-0"
                  title="Live preview"
                  loading="lazy"
                  style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '222%', height: '222%' }}
                />
              ) : (
                <img
                  src={cachedContent}
                  alt="Project preview"
                  className="w-full"
                  style={{ maxWidth: '100%' }}
                />
              )}
            </div>
          </div>
          <div className="absolute left-1/2 top-0 h-[16px] w-[60px] -translate-x-1/2 rounded-b-[8px] bg-[#1a1a1a]" />
          <div className="absolute bottom-[6px] left-1/2 h-[3px] w-[80px] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    );
  }

  return null;
}