<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $todoList = Todo::latest()->get();

        return  Inertia::render('Todos',[
            'todoList' => $todoList
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string',
        ]);

        Todo::create([
            'title' => $request->title,
        ]);

        return redirect()->route('todos.index');

    }
    

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
       $request->validate(['title'=>'required|string']);
       
       $todo->update(['title'=>$request->title]);

       return redirect()->route('todos.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        
       return redirect()->route('todos.index');
    }

    public function bulkDestroy(){
        Todo::truncate();
       return redirect()->route('todos.index');

    }
}
