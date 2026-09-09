// Parameter W must be at least 1. Synchronous active-high reset.
module counter #(parameter W = 4) (
    input wire clk,
    input wire rst,
    input wire en,
    output reg [W-1:0] q
);
    always @(posedge clk) begin
        if (rst)
            q <= {W{1'b0}};
        else if (en)
            q <= q + 1'b1;
    end
endmodule
