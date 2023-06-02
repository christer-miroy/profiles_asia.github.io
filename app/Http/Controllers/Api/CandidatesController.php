<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidates;
use App\Http\Requests\StoreCandidatesRequest;
use App\Http\Requests\UpdateCandidatesRequest;
use App\Http\Resources\CandidateResource;

class CandidatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CandidateResource::collection(
            Candidates::query()->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCandidatesRequest $request)
    {
        $data = $request->validated();

        $candidate = Candidates::create($data);

        return response(new CandidateResource($candidate), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidates $candidates)
    {
        return new CandidateResource($candidates);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCandidatesRequest $request, Candidates $candidates)
    {
        $data = $request->validated();

        $candidates->update($data);

        return new CandidateResource($candidates);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidates $candidates)
    {
        $candidates->delete();

        return response('', 204);
    }
}
