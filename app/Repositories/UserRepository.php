<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    protected $user;

    public function __construct(User $user)
    {
        parent::__construct($user);
        $this->user = $user;
    }
   
    public function addUser(array $data)
    {
        return $this->user->create($data);
    }


    public function updateUser($id, array $data)
    {
        $user = $this->user->findOrFail($id);
        return $user->update($data);
    }

    
}
