package com.niantic.controllers;

import com.niantic.data.TradeDao;
import com.niantic.models.Trade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeDao tradeDao;

    @Autowired
    public TradeController(TradeDao tradeDao) {
        this.tradeDao = tradeDao;
    }
    
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Trade>> getAllTrades() {
        List<Trade> trades = tradeDao.getAllTrades();
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/{tradeId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Trade> getTradeById(@PathVariable int tradeId) {
        Trade trade = tradeDao.getTradeByTradeId(tradeId);
        if (trade != null) {
            return ResponseEntity.ok(trade);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Trade> createTrade(@RequestBody Trade trade) {
        Trade createdTrade = tradeDao.addTrade(trade);
        return ResponseEntity.ok(createdTrade);
    }

    @PutMapping("/{tradeId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTradeStatus(@PathVariable int tradeId, @RequestParam String status) {
        tradeDao.updateTradeStatus(tradeId, status);
        return ResponseEntity.ok("Trade status updated successfully.");
    }

    @PutMapping("/{tradeId}/received")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTradeReceived(@PathVariable int tradeId, @RequestParam int userId, @RequestParam boolean received) {
        tradeDao.updateTradeReceived(tradeId, userId, received);
        return ResponseEntity.ok("Trade received status updated successfully.");
    }

    @DeleteMapping("/{tradeId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteTrade(@PathVariable int tradeId) {
        tradeDao.deleteTrade(tradeId);
        return ResponseEntity.ok("Trade deleted successfully.");
    }
}
