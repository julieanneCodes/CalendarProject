<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ViewConfigRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, ViewConfigRepository $configRepo): Response
    {
        $defaultView = $configRepo->findOneBy(['id' => 1]);
        $singleView = $configRepo->findOneBy(['id' => 2]);
         if ($this->getUser() && $this->getUser()->getViewConfig() == $defaultView ) {
             return $this->redirectToRoute('double');
        } else if($this->getUser() && $this->getUser()->getViewConfig() == $singleView) {
            return $this->redirectToRoute('single');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        $email = isset($_SESSION["email"]) ? $_SESSION["email"] : ""; 
        return $this->render('security/login.html.twig', ['email' => $email, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
