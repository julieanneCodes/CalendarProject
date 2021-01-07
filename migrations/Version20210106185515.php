<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210106185515 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_6EA9A146A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__calendar AS SELECT id, user_id, time, day, notes, eventname FROM calendar');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, time TIME NOT NULL, day DATE NOT NULL, notes VARCHAR(100) DEFAULT NULL COLLATE BINARY, eventname VARCHAR(20) NOT NULL COLLATE BINARY, second_day DATE NOT NULL, second_time TIME NOT NULL, CONSTRAINT FK_6EA9A146A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO calendar (id, user_id, time, day, notes, eventname) SELECT id, user_id, time, day, notes, eventname FROM __temp__calendar');
        $this->addSql('DROP TABLE __temp__calendar');
        $this->addSql('CREATE INDEX IDX_6EA9A146A76ED395 ON calendar (user_id)');
        $this->addSql('DROP INDEX IDX_527EDB25A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__task AS SELECT id, user_id, day, taskname, notes FROM task');
        $this->addSql('DROP TABLE task');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL, taskname VARCHAR(20) NOT NULL COLLATE BINARY, notes VARCHAR(100) NOT NULL COLLATE BINARY, CONSTRAINT FK_527EDB25A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO task (id, user_id, day, taskname, notes) SELECT id, user_id, day, taskname, notes FROM __temp__task');
        $this->addSql('DROP TABLE __temp__task');
        $this->addSql('CREATE INDEX IDX_527EDB25A76ED395 ON task (user_id)');
        $this->addSql('DROP INDEX IDX_8D93D649A755C202');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, view_config_id, email, name, password FROM user');
        $this->addSql('DROP TABLE user');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, view_config_id INTEGER DEFAULT NULL, email VARCHAR(180) NOT NULL COLLATE BINARY, name VARCHAR(30) NOT NULL COLLATE BINARY, password VARCHAR(255) NOT NULL COLLATE BINARY, CONSTRAINT FK_8D93D649A755C202 FOREIGN KEY (view_config_id) REFERENCES view_config (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO user (id, view_config_id, email, name, password) SELECT id, view_config_id, email, name, password FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE INDEX IDX_8D93D649A755C202 ON user (view_config_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_6EA9A146A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__calendar AS SELECT id, user_id, time, day, notes, eventname FROM calendar');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('CREATE TABLE calendar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, time TIME NOT NULL, day DATE NOT NULL, notes VARCHAR(100) DEFAULT NULL, eventname VARCHAR(20) NOT NULL)');
        $this->addSql('INSERT INTO calendar (id, user_id, time, day, notes, eventname) SELECT id, user_id, time, day, notes, eventname FROM __temp__calendar');
        $this->addSql('DROP TABLE __temp__calendar');
        $this->addSql('CREATE INDEX IDX_6EA9A146A76ED395 ON calendar (user_id)');
        $this->addSql('DROP INDEX IDX_527EDB25A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__task AS SELECT id, user_id, day, taskname, notes FROM task');
        $this->addSql('DROP TABLE task');
        $this->addSql('CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, day DATE DEFAULT NULL, taskname VARCHAR(20) NOT NULL, notes VARCHAR(100) NOT NULL)');
        $this->addSql('INSERT INTO task (id, user_id, day, taskname, notes) SELECT id, user_id, day, taskname, notes FROM __temp__task');
        $this->addSql('DROP TABLE __temp__task');
        $this->addSql('CREATE INDEX IDX_527EDB25A76ED395 ON task (user_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('DROP INDEX IDX_8D93D649A755C202');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, view_config_id, email, name, password FROM user');
        $this->addSql('DROP TABLE user');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, view_config_id INTEGER DEFAULT NULL, email VARCHAR(180) NOT NULL, name VARCHAR(30) NOT NULL, password VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO user (id, view_config_id, email, name, password) SELECT id, view_config_id, email, name, password FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
        $this->addSql('CREATE INDEX IDX_8D93D649A755C202 ON user (view_config_id)');
    }
}
