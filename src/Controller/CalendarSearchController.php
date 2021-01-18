<?php

namespace App\Controller;

use App\Repository\CalendarRepository;
use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CalendarSearchController extends AbstractController
{
    /**
     * @Route("/search", name="search", methods={"GET"})
     */
    public function search(Request $request, CalendarRepository $calendarRepository, SerializerInterface $serializer, TaskRepository $taskRepository)
    {
        $requestString = $request->get('event');
        $userId = $request->get('userIde');
        $entity =  $serializer->serialize($calendarRepository->findByField($requestString, $userId), 'json', ['groups' => 'calendar_data']);

        if(strlen($entity) <= 2) {
            $entity =  $serializer->serialize($taskRepository->findAllByField($requestString, $userId), 'json', ['groups' => 'tasks_data']);
        }

        return new Response($entity);
    }
}
