import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'; 

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  license_plate!: string;

  @Column('varchar')
  brand!: string;

  @Column('varchar')
  model!: string;

  @Column('varchar')
  year!: string;

  @Column('varchar')
  type!: number;

	@CreateDateColumn()
	created_at!: Date;	

	@UpdateDateColumn()
	updated_at!: Date;	
}

export default Car;