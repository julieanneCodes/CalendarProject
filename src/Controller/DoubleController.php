<?php

namespace App\Controller;

use App\Repository\CalendarRepository;
use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DoubleController extends AbstractController
{
    private $security;
    public function __construct(Security $security)
    {
        $this->security= $security;
    }
    /**
     * @Route("/double", name="double")
     */
    public function index(CalendarRepository $calendarRepository, TaskRepository $taskRepository, SerializerInterface $serializer): Response
    {
        $user = $this->security->getUser();
        $id = $user->getId();
        $calendarData = $serializer->serialize($calendarRepository->findAllById($id), 'json', ['groups' => 'calendar_data']);
        $tasksData = $serializer->serialize($taskRepository->findAllById($id), 'json', ['groups' => 'tasks_data']);
        return $this->render('double/index.html.twig', [
            'data' => $calendarData,
            'userId' => $id,
            'taskData' => $tasksData,
            'user' => $user,
            'tasks' => $taskRepository->findAllById($id)
        ]);
    }
}
