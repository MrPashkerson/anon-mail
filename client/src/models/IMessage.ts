export interface IMessage {
    _id: string;
    sender: string;
    recipient: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}