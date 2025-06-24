import {OrderRepositoryinterface} from "../repositories/orderRepositoryInterface";

export interface OrderServiceinterface {
    status: string;
    price: number;
    id: string;
    limit: object;
    interface: OrderRepositoryinterface;

    /**
     * get status
     * @return string
     */
    getStatus(): string;

    /**
     * set status
     * @param status
     * @return this
     */
    setStatus(status: string): setStatus;

    /**
     * get price
     * @return string
     */
    getPrice(): number;

    /**
     * set price
     * @param price
     * @return {this}
     */
    setPrice(price: number): setPrice;

    /**
     * Set is
     * @param {string} id
     * @return {this}
     */
    setId(id: string): setId;

    /**
     * Get id
     * @return {string}
     */
    getId(): any;

    /**
     * Set limit
     * @param {object} limit
     * @return {this}
     */
    setLimit(limit: object): setLimit;

    /**
     * Get limit
     * @return {object}
     */
    getLimit(): any;

    /**
     * Create order
     * @return {object}
     */
    createOrder(): Promise<any>;

    /**
     * Get order
     * @return {object}
     */
    getOrder(): Promise<any>;

    /**
     * Get orders
     * @return {object}
     */
    getOrders(): Promise<any>;

    /**
     * Delete order
     * @return {void}
     */
    deleteOrder(): Promise<void>;

    /**
     * Update order
     * @return {object}
     */
    updateOrder(): Promise<any>;
}