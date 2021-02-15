import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'; 

@Entity('vehicles')
class Vehicle {
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
  type!: string;

	@CreateDateColumn()
	created_at!: Date;	

	@UpdateDateColumn()
	updated_at!: Date;	
}

export default Vehicle;