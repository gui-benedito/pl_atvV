import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import Produto from './Produto';
import Servico from './Servico';
import { Cliente } from './Cliente';
import { Pet } from './Pet';

@Table({
    tableName: 'Compra',
    timestamps: false,
})

export class Compra extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    compra_id!: number

    @ForeignKey(() => Produto)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    produto_id!: number

    @ForeignKey(() => Servico)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    servico_id!: number

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cliente_id!: number

    @ForeignKey(() => Pet)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    pet_id!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    quantidade!: number

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    valor!: number

    @BelongsTo(() => Cliente)
    Cliente!: Cliente
}