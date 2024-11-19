import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, } from 'sequelize-typescript';
import { Pet } from './Pet';
  
  @Table({
    tableName: 'Usuario',
    timestamps: false,
  })
  export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    usuario_id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    usuario_nome!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    usuario_nomeSocial!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    usuario_cpf!: string;
  
    @Column({
      type: DataType.DATEONLY,
      allowNull: false,
    })
    emissao_cpf!: Date;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    usuario_rg!: string;
  
    @Column({
      type: DataType.DATEONLY,
      allowNull: false,
    })
    emissao_rg!: Date;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    usuario_telefone!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    usuario_email!: string;
  
    @HasMany(() => Pet)
    pets!: Pet[];
  }
  