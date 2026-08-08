// import { useState, useEffect, useRef } from 'react';
// import { MonitorIcon, SmartphoneIcon } from 'lucide-react';
// import { DeviceFrame } from './DeviceFrame.tsx';


// type DeviceType = 'mac' | 'phone' | 'full';
// type ContentType = 'live' | 'static';

// interface Design {
//   title: string;
//   image: string;
//   liveUrl?: string;
//   deviceType?: 'desktop' | 'mobile';
//   customHeight?: string;
//   disableMacPreview?: boolean;
// }

// interface PreviewDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialDevice: DeviceType;
//   contentType: ContentType;
//   content: string;
//   designs?: Design[];
//   disablePhonePreview?: boolean;
// }

// export function PreviewDialog({ isOpen, onClose, initialDevice, contentType, content, designs, disablePhonePreview }: PreviewDialogProps) {
//   const [device, setDevice] = useState<DeviceType>(initialDevice);
//   const [selectedDesign, setSelectedDesign] = useState<Design | undefined>(designs?.[0]);
//   const scrollPosition = useRef(0);

//   useEffect(() => {
//     setDevice(initialDevice);
//   }, [initialDevice]);

//   useEffect(() => {
//     if (designs && designs.length > 0) {
//       setSelectedDesign(designs[0]);
//     }
//   }, [designs]);

//   const handleDesignSelect = (design: Design) => {
//     setSelectedDesign(design);
//     if (design.deviceType === 'mobile') {
//       setDevice('phone');
//     } else {
//       setDevice('mac');
//     }
//   };

//   const currentContent = selectedDesign?.liveUrl || selectedDesign?.image || content;
//   const currentContentType = selectedDesign?.liveUrl ? 'live' : contentType;

//   useEffect(() => {
//     if (isOpen) {
//       scrollPosition.current = window.scrollY;
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//       window.scrollTo(0, scrollPosition.current);
//     }
//     return () => {
//       document.body.style.overflow = '';
//       window.scrollTo(0, scrollPosition.current);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
//       <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
//         {device !== 'full' && (
//           <div className="absolute right-20 top-1/2 -translate-y-1/2 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
//             {!selectedDesign?.disableMacPreview && (!selectedDesign?.deviceType || selectedDesign.deviceType === 'desktop') ? (
//               <button
//                 onClick={() => setDevice('mac')}
//                 className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
//                   device === 'mac' ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'
//                 }`}
//               >
//                 <MonitorIcon className="h-4 w-4" />
//                 Mac
//               </button>
//             ) : null}
//             {!disablePhonePreview && (
//               <button
//                 onClick={() => setDevice('phone')}
//                 className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
//                   device === 'phone' ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'
//                 }`}
//               >
//                 <SmartphoneIcon className="h-4 w-4" />
//                 Phone
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


