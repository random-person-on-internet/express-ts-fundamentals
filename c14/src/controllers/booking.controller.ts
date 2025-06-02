import { Request, Response } from "express";
import Booking from "../models/booking.model";

export const getPaginatedBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const status = req.query.status as string | undefined;

    const query: any = {};
    if (status) query.status = status;

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      Booking.countDocuments(query),
    ]);

    res.status(200).json({
      page,
      pageSize,
      totalRecords: total,
      totalPages: Math.ceil(total / pageSize),
      data: bookings,
    });
    return;
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });

    return;
  }
};
