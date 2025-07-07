<?php

namespace App\Repositories;

use App\Models\ClientDetails;

class ClientDetailsRepository extends BaseRepository
{
    protected $clientDetails;

    public function __construct(ClientDetails $clientDetails)
    {
        parent::__construct($clientDetails);
        $this->clientDetails = $clientDetails;
    }

    public function addClientDetails(array $newClientData)
    {
        return $this->clientDetails->create($newClientData);
    }

    public function updateClientDetails($id, array $updatedClientData)
    {
        $client = $this->clientDetails->findOrFail($id);
        return $client->update($updatedClientData);
    }

    
}
