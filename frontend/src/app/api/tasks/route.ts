import { NextRequest, NextResponse } from 'next/server';
import handler from '../connectDB';

import { addTasks, getAllTasks } from '../controller/taskController';
import { verifyJwtToken } from '../middleware/checkAuth';

import {Tasks} from '@/lib/types/taskInterface/taskInterface'



export async function GET(request: NextRequest) {
  try {
    await handler();
    const user = await verifyJwtToken();
    const tasks = await getAllTasks(user.id)
    return NextResponse.json(tasks, { status: 200 });

  } catch (err) {
    return NextResponse.json({ msg: 'something went wrong Please Try Again!' }, { status: 500 });
  }
}


export async function POST(request : NextRequest) {
  try {
    await handler();
    const user = await verifyJwtToken();
    const body: Tasks = await request.json();

    const userid = user.id;

    const msg = await addTasks(userid, body);
    return NextResponse.json({ msg: 'Task Added' }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: 'something went wrong Please Try Again!' }, { status: 500 });
  }
}
