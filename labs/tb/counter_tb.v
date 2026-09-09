`timescale 1ns/1ps
module counter_tb;
    reg clk = 0;
    reg rst = 0;
    reg en = 0;
    wire [3:0] q;
    integer checks = 0;
    integer i;
    counter #(.W(4)) dut (.clk(clk), .rst(rst), .en(en), .q(q));
    always #5 clk = ~clk;

    // Change control signals away from the sampling edge, then wait for NBA updates.
    task step;
        input reset_value;
        input enable_value;
        input [3:0] expected;
        begin
            @(negedge clk);
            rst = reset_value;
            en = enable_value;
            @(posedge clk);
            #1;
            checks = checks + 1;
            if (q !== expected)
                $fatal(1, "check %0d: rst=%b en=%b expected=%h actual=%h",
                       checks, rst, en, expected, q);
        end
    endtask

    initial begin
        $dumpfile("build/counter.vcd");
        $dumpvars(0, counter_tb);
        step(1, 0, 0);
        step(0, 0, 0);
        for (i=1; i<=15; i=i+1)
            step(0, 1, i);
        step(0, 1, 0); // modulo-16 overflow
        step(0, 1, 1);
        step(0, 0, 1);
        step(0, 0, 1);
        step(1, 1, 0); // reset must win over enable from nonzero state
        step(0, 1, 1);
        // Verify that synchronous reset does not change q between active edges.
        @(negedge clk);
        rst = 1;
        en = 0;
        #1;
        checks = checks + 1;
        if (q !== 4'd1) $fatal(1, "reset acted asynchronously");
        @(posedge clk);
        #1;
        checks = checks + 1;
        if (q !== 4'd0) $fatal(1, "reset not sampled at rising edge");
        $display("PASS: %0d directed checks", checks);
        $finish;
    end
    initial begin
        #10000;
        $fatal(1, "simulation timeout");
    end
endmodule
