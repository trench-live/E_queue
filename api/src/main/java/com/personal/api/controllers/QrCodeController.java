package com.personal.api.controllers;

import com.google.zxing.WriterException;
import com.personal.api.entities.order.CustomerOrder;
import com.personal.api.services.OrderService;
import com.personal.api.services.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/qr")
public class QrCodeController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private QrCodeService qrCodeService;

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generate(@RequestBody CustomerOrder order) {
        try {
            CustomerOrder savedOrder = orderService.create(order);

            String linkToService = "https://example.com/orders";
            String qrCodeLink = linkToService + "?orderId=" + savedOrder.getId();

            byte[] qrCode = qrCodeService.generateQrCode(qrCodeLink);

            return createResponseEntity(qrCode);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<byte[]> createResponseEntity(byte[] qrCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "image/png");
        return new ResponseEntity<>(qrCode, headers, HttpStatus.OK);
    }
}

