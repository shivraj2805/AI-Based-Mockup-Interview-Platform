import { LightbulbIcon, Volume2 } from 'lucide-react';
import React from 'react';

function QueshionsSection({ mockInterviewQueshion, activeQueshionIndex }) {
 
    const textToSpeech=(text)=>{
      if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      }
      else{
        alert('Sorry , Your browser does not support text to speech')
      }
    }

  return mockInterviewQueshion && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQueshion.map((queshion, index) => (
          <h2 
            key={index}  // ✅ Added key here
            className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer 
              ${activeQueshionIndex === index && 'bg-primary text-white'}`}
          >
            Queshion #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQueshion[activeQueshionIndex]?.question}</h2> {/* ✅ Fixed 'queshion' typo */}

        <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQueshion[activeQueshionIndex]?.question)} />

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary '>
                <LightbulbIcon />
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>

    </div>
  );
}

export default QueshionsSection;
