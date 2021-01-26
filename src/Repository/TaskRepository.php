<?php

namespace App\Repository;

use App\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Task::class);
    }

    public function findAllById($id)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.user = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getResult();
    }

    public function findAllByField($name, $id) {
        return $this->createQueryBuilder('t')
        ->andWhere('t.taskname = :val', 't.user = :id')
        ->setParameters(['val' => $name, 'id' => $id])
        ->getQuery()
        ->getResult();
    }

    public function edit($id, $task, $day, $notes)
    {
        return $this->createQueryBuilder('t')
        ->update()
        ->set('t.taskname', ':task')
        ->set('t.day', ':dayone')
        ->set('t.notes', ':notes')
        ->andWhere('t.id = :val')
        ->setParameters(['val' => $id, 'task' => $task, 'dayone' => $day, 'notes' => $notes])
        ->getQuery()
        ->execute();

    }
    public function deleteTask($id)
    {
        return $this->createQueryBuilder('t')
        ->delete()
        ->andWhere('t.id =:val')
        ->setParameter('val', $id)
        ->getQuery()
        ->execute();
    }
}
