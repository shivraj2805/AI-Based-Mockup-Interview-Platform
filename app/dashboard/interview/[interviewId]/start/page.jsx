"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QueshionsSection from './_components/QueshionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {

    const [interviewData , setInterviewData]=useState();
    const [mockInterviewQueshion , setMockInterviewQueshion]=useState();
    const [activeQueshionIndex,setActiveQueshionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();

    } , []);

     /**
         * Used to get Interview Details by MockId/Interview Id
         */
        const GetInterviewDetails = async() =>{
            const result=await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId,params.interviewId))
    
            const jsonMockResp=JSON.parse(result[0].jsonMockResp);

            console.log(jsonMockResp);
            setMockInterviewQueshion(jsonMockResp);
            setInterviewData(result[0]);
        }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
             {/* Queshions  */}
                <QueshionsSection
                 mockInterviewQueshion={mockInterviewQueshion}
                 activeQueshionIndex={activeQueshionIndex}
                 />

             {/* Video / Audio Recording */}
             <RecordAnswerSection
              mockInterviewQueshion={mockInterviewQueshion}
              activeQueshionIndex={activeQueshionIndex}
              interviewData={interviewData}
             />
        </div>

        <div className='flex justify-end gap-6 pb-2'>
            {activeQueshionIndex >0 && 
            <Button onClick={()=>setActiveQueshionIndex(activeQueshionIndex-1)}>Previous Question</Button>}
            { activeQueshionIndex!=mockInterviewQueshion?.length-1 &&
             <Button onClick={()=>setActiveQueshionIndex(activeQueshionIndex+1)}>Next Question</Button>}
            {activeQueshionIndex==mockInterviewQueshion?.length-1 &&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                 <Button >End Interview</Button> 
            </Link>}
        </div>

    </div>
  )
}

export default StartInterview