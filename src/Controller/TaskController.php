<?php

namespace App\Controller;

use App\Entity\Task;
use App\Form\TaskType;
use App\Repository\TaskRepository;
use App\Repository\ViewConfigRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/task")
 */
class TaskController extends AbstractController
{
    private $security;
    public function __construct(Security $security)
    {
        $this->security= $security;
    }
    /**
     * @Route("/new", name="task_new", methods={"GET","POST"})
     */
    public function new(Request $request, ViewConfigRepository $configRepo): Response
    {
        $defaultView = $configRepo->findOneBy(['id' => 1]);
        $singleView = $configRepo->findOneBy(['id' => 2]);
        $user = $this->security->getUser();
        $task = new Task();
        $form = $this->createForm(TaskType::class, $task);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($task);
            $entityManager->flush();

            if($user->getViewConfig() === $singleView) {
                return $this->redirectToRoute('single_tasks');
            } else if($user-> getViewConfig() === $defaultView) {
                return $this->redirectToRoute('double');
            }
        }

        return $this->render('task/new.html.twig', [
            'task' => $task,
            'form' => $form->createView(),
            'buttonDisplay' => 'none',
            'backRoute' => $user->getViewConfig() === $defaultView ? "http://127.0.0.1:8000/double" : "http://127.0.0.1:8000/single",
        ]);
    }

    /**
     * @Route("/tasking/edit", name="task-edit", methods={"GET", "POST"})
     */
    public function editTest(Request $request, TaskRepository $taskRepo)
    {
        $data = json_decode($request->getContent(), true);
        $tId = $data["id"];
        $taskName = $data["name"];
        $day = $data["day"];
        $notes = $data["notes"];

        $taskRepo->edit($tId, $taskName, $day, $notes);

        return new Response();
    }

    /**
     * @Route("/delete/{id}", name="task_delete", methods={"DELETE"})
     */
    public function delete(int $id, TaskRepository $taskRepository)
    {
        $taskRepository->deleteTask($id);

        return new Response();
    }
}
