import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getCategories } from "../services/categoryService";

vi.mock("axios");

describe("categoryService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns categories on successful API call", async () => {
    const mockResponse = {
      status: "success",
      message: "Categories fetched successfully",
      data: [
        {
          _id: "1",
          name: "Fiction",
          image: "fiction.jpg",
        },
      ],
    };

    vi.mocked(axios.get).mockResolvedValue({
      data: mockResponse,
    });

    const result = await getCategories();

    expect(axios.get).toHaveBeenCalledWith(
      "https://be-book-rental.onrender.com/api/Category"
    );

    expect(result).toEqual(mockResponse);
  });

  it("throws an error when API call fails", async () => {
    const error = new Error("Network Error");

    vi.mocked(axios.get).mockRejectedValue(error);

    await expect(getCategories()).rejects.toThrow("Network Error");

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});