<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $events = Event::paginate(10);
        return response()->json([
            'status' => 'success',
            'data' => $events
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEventRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEventRequest $request)
    {
        // Retrieve the validated input...
        $validated = $request->safe()->all();
        $newEvent =  Event::create($validated);        

        return response()->json([
            'status' => 'success',
            'data' => $newEvent
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEventRequest  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $validated = $request->safe()->only(['title', 'description', 'start_date', 'end_date']);

        $updated =  $event->update($validated);        

        if($updated){
            return response()->json([
                'status' => 'success',
                'data' => $event
            ], 200);
        } else {
            return response()->json([
                'status' => 'fail',
                'data' => null,
                'message' => 'Something went worng!'
            ], 404);
        } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event, $id)
    {
        $eventFound = $event->find($id);
        
        if (!$eventFound) {
            return response()->json([
                'status' => 'fail',
                'data' => null,
                'status_text_code' => 'MODEL_NOT_FOUND',
                'message' => 'Event not found!'
            ], 404);
        }

        /* Deleting the events */
        $eventFound->delete();

        return response()->json([
            'status' => 'success',
            'data' => null
        ], 200);
    }
}
