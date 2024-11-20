import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, } from 'sequelize-typescript';
import { Pet } from './Pet';
  
  @Table({
    tableName: 'Cliente',
    timestamps: false,
  })
  export class Cliente extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    cliente_id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    cliente_nome!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    cliente_nomeSocial!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    cliente_cpf!: string;
  
    @Column({
      type: DataType.DATEONLY,
      allowNull: false,
    })
    emissao_cpf!: Date;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    cliente_rg!: string;
  
    @Column({
      type: DataType.DATEONLY,
      allowNull: false,
    })
    emissao_rg!: Date;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    cliente_telefone!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    cliente_email!: string;
  
    @HasMany(() => Pet)
    pets!: Pet[];
  }
  