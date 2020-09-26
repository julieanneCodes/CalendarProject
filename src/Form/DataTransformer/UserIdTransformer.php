<?php

namespace App\Form\DataTransformer;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Symfony\Component\Security\Core\Security;

class UserIdTransformer implements DataTransformerInterface
{
    private $entityManager;
    private $security;
    
    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager= $entityManager;
        $this->security= $security;
    }

    public function transform($user)
    {
        $user= $this->security->getUser();
        if(null == $user) {
            return '';
        }

        return $user->getId();
    }
    public function reverseTransform($idUser)
    {
        if (!$idUser) {
            return;
        }
        $user= $this->entityManager->getRepository(User::class)->find($idUser);

        if(null=== $user) {
            throw new TransformationFailedException(sprintf('error', $idUser));
        }
        return $user;
    }
}