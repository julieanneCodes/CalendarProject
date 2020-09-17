<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200917203633 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(30) NOT NULL, mail VARCHAR(50) NOT NULL, password VARCHAR(20) NOT NULL)');
        $this->addSql('CREATE TABLE user_config (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, color VARCHAR(10) NOT NULL, panel_view INTEGER NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B1D83441A76ED395 ON user_config (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_config');
    }
}
