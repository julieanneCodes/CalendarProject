<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserConfigType;
use App\Repository\UserRepository;
use App\Repository\ViewConfigRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @Route("/user")
 */
class UserController extends AbstractController
{
    
    /**
     * @Route("/{id}/edit", name="user_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, User $user, ViewConfigRepository $configRepo ): Response
    {
        $defaultView = $configRepo->findOneBy(['id' => 1]);
        $singleView = $configRepo->findOneBy(['id' => 2]);
        $form = $this->createForm(UserConfigType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            if($user->getViewConfig() === $defaultView) {
                return $this->redirectToRoute('double');
            } else if($user->getViewConfig() === $singleView) {
                return $this->redirectToRoute('single_calendar');
            }
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'id' => $user->getId(),
            'form' => $form->createView(),
            'buttonDisplay' => 'none',
            'edit' => 'http://127.0.0.1:8000/user/'.$user->getId().'/edit',
            'editPasswd' => 'http://127.0.0.1:8000/user/edit/passwd'
        ]);
    }

    /**
     * @Route("/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_index');
    }
}
