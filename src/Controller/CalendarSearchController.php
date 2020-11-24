<?php

namespace App\Controller;

use App\Repository\CalendarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CalendarSearchController extends AbstractController
{
    /**
     * @Route("/search", name="search", methods={"GET"})
     */
    public function search(Request $request, CalendarRepository $calendarRepository)
    {
        $requestString = $request->get('query');

        $entity = $calendarRepository->findByField($requestString);

        if(!$entity) {
            $result['calendar']['error'] = "No results found :(";
        } else {
            $result['calendar'] = $this->getStuff($entity);
        }
        return new Response(json_encode($result));
    }

    public function getStuff($entity) {
        foreach($entity as $ent){
            $dates[$ent->getId()] = [
            $ent->getTime(),
            $ent->getDay(),
            $ent->getNotes(),
            $ent->getEventName(),
        ];
        }
        return $dates;
    }
}
