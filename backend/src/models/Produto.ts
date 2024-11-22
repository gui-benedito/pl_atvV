import { Table, Column, Model, DataType, BelongsToMany, HasMany, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Compra } from './Compra'

@Table({
    tableName: 'Produto',
    timestamps: false
})

export default class Produto extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    produto_id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    produto_nome!: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    produto_preco!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    produto_quantidade!: number

    @HasMany(() => Compra)
    compras!: Compra[];
}