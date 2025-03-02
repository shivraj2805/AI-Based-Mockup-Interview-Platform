"use client";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQueshion, activeQueshionIndex , interviewData}) {
  const [userAnswer , setUserAnswer]=useState('');
  const {user}=useUser();
  const [loading , setLoading]=useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result.transcript)
    ))
  },[results])

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10){
      UpdateUserAnswer();
    }
    
  },[userAnswer])

  const StartStopRecording=async()=>{
    if(isRecording){
      
      stopSpeechToText();
    }else{
      startSpeechToText();
    }
  }

  const UpdateUserAnswer=async()=>{
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt="Queshion:"+mockInterviewQueshion[activeQueshionIndex]?.question+
    ", User Answer:"+userAnswer+", Depends on question and user answer for give interview queshion"+
    " please give us rating out of 10 for answer and feedback as area of improvment if any"+
    " in just 3 to 5 lines to improve it in JSON format with rating field and feedback feild";

    const result=await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');

    console.log(mockJsonResp);

    const JsonFeedbackResp=JSON.parse(mockJsonResp);

    const resp=await db.insert(UserAnswer)
      .values({
            mockIdRef:interviewData?.mockId,
            queshion:mockInterviewQueshion[activeQueshionIndex]?.question,
            correctAns:mockInterviewQueshion[activeQueshionIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
      })

      if(resp){
        toast('User Answer recorded succesfully !');
        setUserAnswer('');
        setResults([]);
      }

      setResults([]);
      setLoading(false);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-20 ml-10 justify-center items-center  rounded-lg p-5 gap-10 bg-black">
        <Image
          src={"/webcam3.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={loading} variant="outline"
      onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 items-center">
            <StopCircle />Stop Recording
          </h2>
        ) : 
         <h2 className="text-primary flex gap-2 items-center">
           <Mic /> Record Answer
         </h2>
        }
      </Button>

    </div>
  );
}

export default RecordAnswerSection;