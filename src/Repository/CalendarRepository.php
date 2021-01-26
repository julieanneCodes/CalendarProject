<?php

namespace App\Repository;

use App\Entity\Calendar;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Calendar|null find($id, $lockMode = null, $lockVersion = null)
 * @method Calendar|null findOneBy(array $criteria, array $orderBy = null)
 * @method Calendar[]    findAll()
 * @method Calendar[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CalendarRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Calendar::class);
    }

    /**
     * @return Calendar[] Returns an array of Calendar objects
     */
    public function findByField($value, $id)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.eventname = :val', 'c.user = :id')
            ->setParameters(['val' => $value, 'id' => $id])
            ->getQuery()
            ->getResult();
    }

    public function findAllById($id)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getArrayResult();
    }

    public function edit($id, $event, $dayone, $daytwo, $timeone, $timetwo, $notes)
    {
        return $this->createQueryBuilder('c')
        ->update()
        ->set('c.eventname', ':event')
        ->set('c.day', ':dayone')
        ->set('c.time', ':timeone')
        ->set('c.secondday', ':daytwo')
        ->set('c.secondtime', ':timetwo')
        ->set('c.notes', ':notes')
        ->andWhere('c.id = :val')
        ->setParameters(['val' => $id,'event' => $event, 'dayone' => $dayone, 'timeone' => $timeone, 'daytwo' => $daytwo, 'timetwo' => $timetwo, 'notes' => $notes])
        ->getQuery()
        ->execute();

    }

    public function deleteEvent($id)
    {
        return $this->createQueryBuilder('c')
        ->delete()
        ->andWhere('c.id =:val')
        ->setParameter('val', $id)
        ->getQuery()
        ->execute();
    }
}
