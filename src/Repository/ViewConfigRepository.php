<?php

namespace App\Repository;

use App\Entity\ViewConfig;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ViewConfig|null find($id, $lockMode = null, $lockVersion = null)
 * @method ViewConfig|null findOneBy(array $criteria, array $orderBy = null)
 * @method ViewConfig[]    findAll()
 * @method ViewConfig[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ViewConfigRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ViewConfig::class);
    }

    // /**
    //  * @return ViewConfig[] Returns an array of ViewConfig objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ViewConfig
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
