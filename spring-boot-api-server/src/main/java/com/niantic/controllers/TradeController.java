package com.niantic.controllers;

import com.niantic.data.TradeDao;
import com.niantic.data.UserDao;
import com.niantic.models.Trade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/trade")
public class TradeController {

    private final TradeDao tradeDao;
    private final UserDao userDao;

    @Autowired
    public TradeController(TradeDao tradeDao, UserDao userDao) {
        this.tradeDao = tradeDao;
        this.userDao = userDao;
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
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createTrade(@RequestBody Trade trade, Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        trade.setUserAId(userId);
        Trade createdTrade = tradeDao.addTrade(trade);
        return ResponseEntity.ok(createdTrade);
    }

    @PutMapping("/{tradeId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTradeStatus(@PathVariable int tradeId, @RequestParam String status, Principal principal) {
        Trade existingTrade = tradeDao.getTradeByTradeId(tradeId);
        if (existingTrade == null) {
            return ResponseEntity.notFound().build();
        }

        int userId = userDao.getIdByUsername(principal.getName());
        if (existingTrade.getUserAId() == userId || existingTrade.getUserBId() == userId) {
            tradeDao.updateTradeStatus(tradeId, status);
            return ResponseEntity.ok("Trade status updated successfully.");
        }
        return ResponseEntity.badRequest().body("You are not authorized to update this trade.");
    }

    @PutMapping("/{tradeId}/received")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTradeReceived(@PathVariable int tradeId, @RequestParam boolean received, Principal principal) {
        Trade existingTrade = tradeDao.getTradeByTradeId(tradeId);
        if (existingTrade == null) {
            return ResponseEntity.notFound().build();
        }

        int userId = userDao.getIdByUsername(principal.getName());
        if (existingTrade.getUserAId() == userId || existingTrade.getUserBId() == userId) {
            tradeDao.updateTradeReceived(tradeId, userId, received);
            return ResponseEntity.ok("Trade received status updated successfully.");
        }
        return ResponseEntity.badRequest().body("You are not authorized to update this trade.");
    }

    @DeleteMapping("/{tradeId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteTrade(@PathVariable int tradeId, Principal principal) {
        Trade existingTrade = tradeDao.getTradeByTradeId(tradeId);
        if (existingTrade == null) {
            return ResponseEntity.notFound().build();
        }

        int userId = userDao.getIdByUsername(principal.getName());
        if (existingTrade.getUserAId() == userId) {
            tradeDao.deleteTrade(tradeId);
            return ResponseEntity.ok("Trade deleted successfully.");
        }
        return ResponseEntity.badRequest().body("You are not authorized to delete this trade.");
    }
}
