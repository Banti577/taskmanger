import { NextRequest, NextResponse } from 'next/server';

import mongoose, { Types } from 'mongoose';

import { getTasks, updateTasks, deleteTasks } from '@/app/api/controller/taskController';
import { verifyJwtToken } from '../../middleware/checkAuth';

export async function GET(request: NextRequest, { params }) {
    try {

        const authorization = request.headers.get('Authorization');
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return new NextResponse('Unauthorized: Bearer token missing or invalid', { status: 401 });
        }

        const accressToken = authorization.split(' ')[1];
        await verifyJwtToken(accressToken);
        const { id } = await params;
        const Task = await getTasks(id);
        return NextResponse.json(Task, { status: 200 });

    } catch (err) {
        console.error("Update Error:", err.message);
        return NextResponse.json({ msg: err.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }) {
    try {
        const { id } = await params;
        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ msg: "Invalid ID format" }, { status: 400 });
        }
        const body = await request.json();
        await updateTasks(id, body);
        return NextResponse.json({ msg: 'Task Updated' }, { status: 200 })
    } catch (err) {

        console.log(err)
        return NextResponse.json({ msg: err.message }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }) {
    try {
        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ msg: "Invalid ID format" }, { status: 400 });
        }

         const authorization = request.headers.get('Authorization');
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return new NextResponse('Unauthorized: Bearer token missing or invalid', { status: 401 });
        }

        const accressToken = authorization.split(' ')[1];
        await verifyJwtToken(accressToken);

        await deleteTasks(id);
        return NextResponse.json({ msg: 'Task Deleted' }, { status: 200 })
    } catch (err) {

        console.log(err)
        return NextResponse.json({ msg: err.message }, { status: 500 })
    }
}

