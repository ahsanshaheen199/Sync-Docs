// import {
// 	CreateDateColumn,
// 	Entity,
// 	Column,
// 	JoinColumn,
// 	ManyToOne,
// 	PrimaryColumn,
// 	UpdateDateColumn,
// } from 'typeorm';
// import { User } from './user.entity';

// @Entity({ name: 'documents' })
// export class Document {
// 	@PrimaryColumn({ type: 'character', length: 26 })
// 	id: string;

// 	@Column({ name: 'title' })
// 	title: string;

// 	@Column({ name: 'content', type: 'jsonb', nullable: true })
// 	content?: string;

// 	@Column({ name: 'initial_content', type: 'jsonb', nullable: true })
// 	initialContent?: string;

// 	@JoinColumn({ name: 'owner_id' })
// 	@ManyToOne(() => User, (user) => user.id, {
// 		onDelete: 'CASCADE',
// 	})
// 	owner: User;

// 	@CreateDateColumn({ name: 'created_at' })
// 	createdAt: Date;

// 	@UpdateDateColumn({ name: 'updated_at' })
// 	updatedAt: Date;
// }
